import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { requireAdmin } from "@/lib/auth-admin";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

// Mark message as READ
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await params;

    const message =
      await Contact.findByIdAndUpdate(
        id,
        {
          status: "READ",
        },
        {
          new: true,
        }
      );

    if (!message) {
      return NextResponse.json(
        {
          message:
            "Message not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message:
        "Message marked as read.",
    });
  } catch (error) {
    console.error(
      "Update contact message error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to update message.",
      },
      {
        status: 500,
      }
    );
  }
}

// Delete message
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } = await params;

    const message =
      await Contact.findByIdAndDelete(
        id
      );

    if (!message) {
      return NextResponse.json(
        {
          message:
            "Message not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message:
        "Message deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete contact message error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to delete message.",
      },
      {
        status: 500,
      }
    );
  }
}