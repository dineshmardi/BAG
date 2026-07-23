import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth-admin";

import Notification from "@/models/Notification";

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();

    const notifications =
      await Notification.find({})
        .sort({
          createdAt: -1,
        })
        .limit(20)
        .lean();

    const unreadCount =
      await Notification.countDocuments({
        isRead: false,
      });

    return NextResponse.json({
      notifications:
        notifications.map(
          (notification: any) => ({
            _id:
              notification._id.toString(),

            type:
              notification.type,

            title:
              notification.title,

            message:
              notification.message,

            orderId:
              notification.orderId
                ? notification.orderId.toString()
                : null,

            isRead:
              notification.isRead,

            createdAt:
              notification.createdAt,
          })
        ),

      unreadCount,
    });
  } catch (error) {
    console.error(
      "Notification fetch error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch notifications.",
      },
      {
        status: 500,
      }
    );
  }
}