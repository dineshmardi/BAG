"use client";
import Link from "next/link";
import type { Order } from "@/types/order";

type OrdersPageProps = {
    orders: Order[];
};

export function OrdersPage({
    orders,
}: OrdersPageProps) {
    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <h1 className="mb-8 text-4xl font-bold">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <div className="rounded-2xl border p-10 text-center">
                    <p className="text-lg">
                        You haven't placed any orders yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="rounded-2xl border bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">
                                        Order #{order._id.slice(-8)}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt!).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </p>
                                </div>

                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
                                    {order.orderStatus}
                                </span>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <p className="font-semibold">
                                    ₹
                                    {order.total.toLocaleString(
                                        "en-IN"
                                    )}
                                </p>

                                <Link
                                    href={`/account/orders/${order._id}`}
                                    className="rounded-lg border px-4 py-2"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}