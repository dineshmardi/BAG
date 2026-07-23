import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Order from "@/models/Order";

import {
  createRazorpayOrder,
} from "@/lib/services/payment.service";

export async function POST(
  request: Request
) {
  try {
    // =========================
    // AUTHENTICATION
    // =========================

    const session =
      await getServerSession(
        authOptions
      );

    if (!session) {
      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    // =========================
    // GET ORDER ID
    // =========================

    const {
      orderId,
    } =
      await request.json();

    // =========================
    // FIND ORDER
    // =========================

    const order =
      await Order.findOne({
        _id: orderId,
        userId:
          session.user.id,
      });

    if (!order) {
      return NextResponse.json(
        {
          message:
            "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =========================
    // VALIDATE PAYMENT METHOD
    // =========================

    if (
      order.paymentMethod !==
      "RAZORPAY"
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid payment method.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // PREVENT PAYMENT FOR
    // ALREADY PAID ORDER
    // =========================

    if (
      order.paymentStatus ===
      "PAID"
    ) {
      return NextResponse.json(
        {
          message:
            "Order is already paid.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // CREATE RAZORPAY ORDER
    //
    // IMPORTANT:
    // Use order.total from DB.
    // Never trust frontend amount.
    // =========================

    const razorpayOrder =
      await createRazorpayOrder({
        amount:
          order.total,

        receipt:
          order._id.toString(),
      });

    // =========================
    // SAVE RAZORPAY ORDER ID
    // =========================

    order.razorpayOrderId =
      razorpayOrder.id;

    await order.save();

    // =========================
    // RETURN RAZORPAY ORDER
    // =========================

    return NextResponse.json(
      razorpayOrder
    );
  } catch (error) {
    console.error(
      "Razorpay order creation error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to create Razorpay order.",
      },
      {
        status: 500,
      }
    );
  }
}