import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  requireAdmin,
} from "@/lib/auth-admin";

import {
  connectDB,
} from "@/lib/mongodb";

import {
  getDashboardAnalytics,
  type AnalyticsRange,
} from "@/lib/services/admin-dashboard.service";

export async function GET(
  request: NextRequest
) {
  try {
    await requireAdmin();

    await connectDB();

    const range =
      request.nextUrl.searchParams.get(
        "range"
      ) ?? "7d";

    const validRanges = [
      "7d",
      "30d",
      "year",
    ];

    if (
      !validRanges.includes(
        range
      )
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid analytics range.",
        },
        {
          status: 400,
        }
      );
    }

    const data =
      await getDashboardAnalytics(
        range as AnalyticsRange
      );

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error(
      "Analytics error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch analytics.",
      },
      {
        status: 500,
      }
    );
  }
}