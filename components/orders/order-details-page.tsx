"use client";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types/order";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { ORDER_STATUS } from "@/constants/order";

type Props = {
    order: Order;
    isAdmin?: boolean;
};

export function OrderDetailsPage({
    order,
    isAdmin = false,
}: Props) {
    const [status, setStatus] = useState(
        order.orderStatus
    );

    const [isSaving, setIsSaving] =
        useState(false);


    async function handleUpdateStatus() {
        try {
            setIsSaving(true);

            await axios.patch(
                `/api/orders/${order._id}/status`,
                {
                    orderStatus: status,
                }
            );

            toast.success(
                "Order status updated."
            );
        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to update order."
            );
        } finally {
            setIsSaving(false);
        }
    }
    return (
        <main className="mx-auto max-w-5xl px-6 py-12">
            <h1 className="mb-8 text-4xl font-bold">
                Order Details
            </h1>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <p>
                    <strong>Order ID:</strong>{" "}
                    {order._id}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {order.orderStatus}
                </p>

                <p>
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod}
                </p>

                <p>
                    <strong>Payment Status:</strong>{" "}
                    {order.paymentStatus}
                </p>

                <p>
                    <strong>Total:</strong> ₹
                    {order.total.toLocaleString(
                        "en-IN"
                    )}
                </p>
            </div>

            <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-semibold">
                    Products
                </h2>

                <div className="space-y-6">
                    {order.items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            <div>
                                <p className="font-medium">
                                    {item.title}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>
                            </div>

                            <p className="font-semibold">
                                ₹
                                {(
                                    item.price *
                                    item.quantity
                                ).toLocaleString("en-IN")}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {isAdmin && (
                <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-2xl font-semibold">
                        Admin Actions
                    </h2>

                    <div className="space-y-4">
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value as typeof ORDER_STATUS[keyof typeof ORDER_STATUS]
                                )
                            }
                            className="w-full rounded-lg border p-3"
                        >
                            {Object.values(
                                ORDER_STATUS
                            ).map((value) => (
                                <option
                                    key={value}
                                    value={value}
                                >
                                    {value}
                                </option>
                            ))}
                        </select>

                        <Button
                            onClick={handleUpdateStatus}
                            disabled={isSaving}
                        >
                            {isSaving
                                ? "Saving..."
                                : "Save Status"}
                        </Button>
                    </div>
                </div>
            )}
        </main>
    );

}

