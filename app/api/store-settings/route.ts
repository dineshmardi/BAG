import {
  NextResponse,
} from "next/server";

import {
  requireAdminApi,
} from "@/lib/auth-admin-api";

import {
  connectDB,
} from "@/lib/mongodb";

import {
  getStoreSettings,
} from "@/lib/services/store-settings.service";

export async function PUT(
  request: Request
) {
  try {
    // =========================
    // ADMIN AUTHORIZATION
    // =========================

    const authResponse =
      await requireAdminApi();

    if (authResponse) {
      return authResponse;
    }

    // =========================
    // DATABASE
    // =========================

    await connectDB();

    const body =
      await request.json();

    const settings =
      await getStoreSettings();

    // =========================
    // GENERAL SETTINGS
    // =========================

    if (
      typeof body.storeName ===
      "string"
    ) {
      settings.storeName =
        body.storeName.trim();
    }

    if (
      typeof body.currency ===
      "string"
    ) {
      settings.currency =
        body.currency.trim();
    }

    if (
      typeof body.shippingCharge ===
      "number"
    ) {
      settings.shippingCharge =
        body.shippingCharge;
    }

    if (
      typeof body.freeShippingAbove ===
      "number"
    ) {
      settings.freeShippingAbove =
        body.freeShippingAbove;
    }

    if (
      typeof body.taxPercentage ===
      "number"
    ) {
      settings.taxPercentage =
        body.taxPercentage;
    }

    // =========================
    // PAYMENT SETTINGS
    // =========================

    if (
      typeof body.codEnabled ===
      "boolean"
    ) {
      settings.codEnabled =
        body.codEnabled;
    }

    if (
      typeof body.codMaximumAmount ===
      "number"
    ) {
      settings.codMaximumAmount =
        body.codMaximumAmount;
    }

    if (
      typeof body.razorpayEnabled ===
      "boolean"
    ) {
      settings.razorpayEnabled =
        body.razorpayEnabled;
    }

    // =========================
    // MAINTENANCE SETTINGS
    // =========================

    if (
      typeof body.maintenanceMode ===
      "boolean"
    ) {
      settings.maintenanceMode =
        body.maintenanceMode;
    }

    if (
      typeof body.maintenanceTitle ===
      "string"
    ) {
      settings.maintenanceTitle =
        body.maintenanceTitle.trim();
    }

    if (
      typeof body.maintenanceMessage ===
      "string"
    ) {
      settings.maintenanceMessage =
        body.maintenanceMessage.trim();
    }

    // =========================
    // SAVE
    // =========================

    await settings.save();

    return NextResponse.json({
      success: true,

      settings,
    });
  } catch (error) {
    console.error(
      "Store settings update error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to update settings.",
      },
      {
        status: 500,
      }
    );
  }
}