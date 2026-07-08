import { requireAdminApi } from "@/lib/auth-admin-api";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { updateOrderStatus } from "@/lib/services/order.service";

type RouteProps = {
    params: Promise<{
        id: string;
    }>;
};

export async function PATCH(
    request: Request,
    { params }: RouteProps
) {
    try {
        await connectDB();
        const authResponse = await requireAdminApi();

        if (authResponse) {
            return authResponse;
        }



        const { id } = await params;

        const { orderStatus } =
            await request.json();

        const order =
            await updateOrderStatus(
                id,
                orderStatus
            );

        if (!order) {
            return NextResponse.json(
                {
                    message: "Order not found.",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to update order status.",
            },
            {
                status: 500,
            }
        );
    }
}