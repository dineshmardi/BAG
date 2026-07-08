import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Order from "@/models/Order";

import { createRazorpayOrder } from "@/lib/services/payment.service";

export async function POST(request: Request) {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const {
      orderId,
      amount,
    } = await request.json();

    const order =
      await Order.findById(orderId);

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

    const razorpayOrder =
      await createRazorpayOrder({
        amount,
        receipt: order._id.toString(),
      });

    order.razorpayOrderId =
      razorpayOrder.id;

    await order.save();

    return NextResponse.json(
      razorpayOrder
    );
  } catch (error) {
    console.error(error);

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