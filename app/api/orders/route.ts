import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import { calculateOrder } from "@/lib/helpers/calculate-order";

import { createOrder } from "@/lib/services/order.service";
import { getAddressById } from "@/lib/services/address.service";

import Product from "@/models/Product";
import Notification from "@/models/Notification";

export async function POST(
  request: Request
) {
  try {
    await connectDB();

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
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // =========================
    // REQUEST DATA
    // =========================

    const {
      addressId,
      paymentMethod,
      items,
    } = await request.json();

    // =========================
    // ADDRESS VALIDATION
    // =========================

    const address =
      await getAddressById(
        addressId
      );

    if (!address) {
      return NextResponse.json(
        {
          message:
            "Address not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Make sure the address
    // belongs to the logged-in user

    if (
      address.userId.toString() !==
      session.user.id
    ) {
      return NextResponse.json(
        {
          message: "Forbidden.",
        },
        {
          status: 403,
        }
      );
    }

    // =========================
    // CALCULATE ORDER
    // =========================

    const calculation =
      await calculateOrder(
        items
      );

    // =========================
    // CREATE ORDER
    // =========================

    const order =
      await createOrder({
        userId:
          session.user.id,

        addressId,

        items:
          calculation.orderItems,

        subtotal:
          calculation.subtotal,

        shipping:
          calculation.shipping,

        total:
          calculation.total,

        paymentMethod,

        paymentStatus:
          paymentMethod === "COD"
            ? "PAID"
            : "PENDING",

        orderStatus:
          "PLACED",
      });

    // =========================
    // CREATE ADMIN NOTIFICATION
    // FOR EVERY NEW ORDER
    // =========================

    await Notification.create({
      type: "NEW_ORDER",

      title:
        paymentMethod === "COD"
          ? "New COD Order"
          : "New Online Order",

      message: `New ${
        paymentMethod === "COD"
          ? "COD"
          : "online"
      } order #${order._id
        .toString()
        .slice(-8)
        .toUpperCase()} received for ₹${calculation.total.toLocaleString(
        "en-IN"
      )}.`,

      orderId:
        order._id,

      isRead:
        false,
    });

    // =========================
    // REDUCE STOCK FOR COD
    // =========================

    if (
      paymentMethod === "COD"
    ) {
      for (
        const item of items
      ) {
        await Product.findByIdAndUpdate(
          item.productId,
          {
            $inc: {
              stock:
                -item.quantity,
            },
          }
        );
      }
    }

    // =========================
    // RETURN CREATED ORDER
    // =========================

    return NextResponse.json(
      order,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Order creation error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to create order.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// GET ORDERS
// Currently unchanged
// =========================

export async function GET() {
  return NextResponse.json(
    []
  );
}