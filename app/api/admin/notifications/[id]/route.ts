import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth-admin";

import Notification from "@/models/Notification";

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await requireAdmin();
    await connectDB();

    const { id } =
      await context.params;

    const notification =
      await Notification.findByIdAndUpdate(
        id,
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    if (!notification) {
      return NextResponse.json(
        {
          message:
            "Notification not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Notification update error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to update notification.",
      },
      {
        status: 500,
      }
    );
  }
}