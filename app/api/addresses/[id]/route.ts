import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import {
  deleteAddress,
  getAddressById,
  updateAddress,
} from "@/lib/services/address.service";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: Request,
  { params }: RouteProps
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const address = await getAddressById(id);

    if (!address) {
      return NextResponse.json(
        { message: "Address not found." },
        { status: 404 }
      );
    }

    if (
      address.userId.toString() !==
      session.user.id
    ) {
      return NextResponse.json(
        { message: "Forbidden." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const updated = await updateAddress(
      id,
      body
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Update failed." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteProps
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const address = await getAddressById(id);

    if (!address) {
      return NextResponse.json(
        { message: "Address not found." },
        { status: 404 }
      );
    }

    if (
      address.userId.toString() !==
      session.user.id
    ) {
      return NextResponse.json(
        { message: "Forbidden." },
        { status: 403 }
      );
    }

    await deleteAddress(id);

    return NextResponse.json({
      message: "Address deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Delete failed." },
      { status: 500 }
    );
  }
}