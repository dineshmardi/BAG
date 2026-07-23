import crypto from "crypto";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Order from "@/models/Order";
import Product from "@/models/Product";

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
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    // =========================
    // REQUEST DATA
    // =========================

    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    // =========================
    // VERIFY RAZORPAY SIGNATURE
    // =========================

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET!
        )
        .update(body)
        .digest("hex");

    if (
      expectedSignature !==
      razorpay_signature
    ) {
      await Order.findOneAndUpdate(
        {
          _id: orderId,
          userId:
            session.user.id,
          paymentStatus: {
            $ne: "PAID",
          },
        },
        {
          paymentStatus:
            "FAILED",
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification failed.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // GET ORDER
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
          success: false,
          message:
            "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =========================
    // ALREADY COMPLETED
    // =========================

    if (
      order.paymentStatus ===
        "PAID" &&
      order.stockDeducted ===
        true
    ) {
      return NextResponse.json({
        success: true,
      });
    }

    // =========================
    // ATOMICALLY CLAIM
    // STOCK DEDUCTION
    //
    // Only one concurrent
    // request can change:
    // false → true
    // =========================

    const claimedOrder =
      await Order.findOneAndUpdate(
        {
          _id: orderId,

          userId:
            session.user.id,

          stockDeducted:
            false,
        },

        {
          $set: {
            stockDeducted:
              true,
          },
        },

        {
          new: true,
        }
      );

    // =========================
    // ANOTHER REQUEST ALREADY
    // CLAIMED STOCK DEDUCTION
    // =========================

    if (!claimedOrder) {
      const existingOrder =
        await Order.findById(
          orderId
        );

      if (
        existingOrder
          ?.paymentStatus ===
          "PAID"
      ) {
        return NextResponse.json({
          success: true,
        });
      }

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment is already being processed.",
        },
        {
          status: 409,
        }
      );
    }

    // =========================
    // REDUCE STOCK
    //
    // Only the request that
    // successfully claimed
    // stockDeducted can reach
    // this section.
    // =========================

    try {
      for (
        const item of
        claimedOrder.items
      ) {
        const updatedProduct =
          await Product.findOneAndUpdate(
            {
              _id:
                item.productId,

              // Prevent negative stock
              stock: {
                $gte:
                  item.quantity,
              },
            },

            {
              $inc: {
                stock:
                  -item.quantity,
              },
            },

            {
              new: true,
            }
          );

        if (
          !updatedProduct
        ) {
          throw new Error(
            `Insufficient stock for product ${item.productId}`
          );
        }
      }

      // =========================
      // PAYMENT SUCCESS
      // =========================

      claimedOrder.paymentStatus =
        "PAID";

      claimedOrder.razorpayOrderId =
        razorpay_order_id;

      claimedOrder.razorpayPaymentId =
        razorpay_payment_id;

      claimedOrder.razorpaySignature =
        razorpay_signature;

      claimedOrder.paymentCompletedAt =
        new Date();

      await claimedOrder.save();

      return NextResponse.json({
        success: true,
      });
    } catch (error) {
      // =========================
      // RELEASE CLAIM
      //
      // Allows recovery/retry
      // if stock processing fails.
      // =========================

      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: {
            stockDeducted:
              false,
          },
        }
      );

      throw error;
    }
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}