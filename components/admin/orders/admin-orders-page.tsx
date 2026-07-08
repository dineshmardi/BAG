"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type Props = {
  orders: any[];
};

export function AdminOrdersPage({
  orders,
}: Props) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          No orders found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  Order
                </th>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Payment
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Total
                </th>
                <th className="p-4 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b"
                >
                  <td className="p-4">
                    #{order._id.slice(-8)}
                  </td>

                  <td className="p-4">
                    {order.userId?.name}
                  </td>

                  <td className="p-4">
                    {order.paymentMethod}
                  </td>

                  <td className="p-4">
                    {order.orderStatus}
                  </td>

                  <td className="p-4">
                    ₹{order.total.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/admin/orders/${order._id}`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}