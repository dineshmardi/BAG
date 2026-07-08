import crypto from "crypto";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Order from "@/models/Order";
import Product from "@/models/Product";

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
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = await request.json();

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
            await Order.findByIdAndUpdate(
                orderId,
                {
                    paymentStatus: "FAILED",
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

        const order =
            await Order.findById(orderId);

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

        // Prevent duplicate verification
        if (
            order.paymentStatus === "PAID"
        ) {
            return NextResponse.json({
                success: true,
            });
        }

        // Reduce stock AFTER successful payment
        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.productId,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        order.paymentStatus = "PAID";

        order.razorpayOrderId =
            razorpay_order_id;

        order.razorpayPaymentId =
            razorpay_payment_id;

        order.razorpaySignature =
            razorpay_signature;

        order.paymentCompletedAt =
            new Date();

        await order.save();


        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

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