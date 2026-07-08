import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import { calculateOrder } from "@/lib/helpers/calculate-order";

import { createOrder } from "@/lib/services/order.service";
import { getAddressById } from "@/lib/services/address.service";

import Product from "@/models/Product";

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const session =
      await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      addressId,
      paymentMethod,
      items,
    } = await request.json();

    const address =
      await getAddressById(addressId);

    if (!address) {
      return NextResponse.json(
        {
          message: "Address not found.",
        },
        {
          status: 404,
        }
      );
    }

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

    const calculation =
      await calculateOrder(items);

    const order =
      await createOrder({
        userId: session.user.id,

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

        // Always create as PENDING
        paymentStatus:
          paymentMethod === "COD"
            ? "PAID"
            : "PENDING",

        orderStatus: "PLACED",
      });

    // Reduce stock ONLY for COD
    if (paymentMethod === "COD") {
      for (const item of items) {
        await Product.findByIdAndUpdate(
          item.productId,
          {
            $inc: {
              stock: -item.quantity,
            },
          }
        );
      }
    }

    return NextResponse.json(
      order,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

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

export async function GET() {
  return NextResponse.json([]);
}