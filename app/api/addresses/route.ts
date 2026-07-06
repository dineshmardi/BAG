import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import {
  createAddress,
  getAddressesByUserId,
} from "@/lib/services/address.service";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const addresses = await getAddressesByUserId(
      session.user.id
    );

    return NextResponse.json(addresses);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch addresses." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const address = await createAddress({
      ...body,
      userId: session.user.id,
    });

    return NextResponse.json(address, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create address." },
      { status: 500 }
    );
  }
}