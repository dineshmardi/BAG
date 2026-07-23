import Link from "next/link";

import {
  ArrowRight,
  Package,
} from "lucide-react";

type RecentOrder = {
  _id: string;

  customer: {
    name: string;
    email: string;
  };

  items: {
    productId: string;
    title: string;
    quantity: number;
    price: number;
  }[];

  total: number;

  paymentMethod:
    | "COD"
    | "RAZORPAY";

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  orderStatus:
    | "PLACED"
    | "CONFIRMED"
    | "PACKED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";

  createdAt: string;
};

type RecentOrdersProps = {
  orders: RecentOrder[];
};

function getPaymentBadge(
  status: RecentOrder["paymentStatus"]
) {
  switch (status) {
    case "PAID":
      return "bg-green-50 text-green-700";

    case "PENDING":
      return "bg-yellow-50 text-yellow-700";

    case "FAILED":
      return "bg-red-50 text-red-700";

    case "REFUNDED":
      return "bg-blue-50 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getOrderBadge(
  status: RecentOrder["orderStatus"]
) {
  switch (status) {
    case "DELIVERED":
      return "bg-green-50 text-green-700";

    case "SHIPPED":
    case "OUT_FOR_DELIVERY":
      return "bg-blue-50 text-blue-700";

    case "PLACED":
    case "CONFIRMED":
    case "PACKED":
      return "bg-yellow-50 text-yellow-700";

    case "CANCELLED":
    case "RETURNED":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatStatus(
  status: string
) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

export function RecentOrders({
  orders,
}: RecentOrdersProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest customer orders
            placed in your store.
          </p>
        </div>

        <Link
          href="/admin/orders"
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold leading-none transition-all duration-200 hover:border-black hover:bg-black hover:text-white sm:self-auto"
        >
          <span>
            View All Orders
          </span>

          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>

      {/* Empty State */}

      {orders.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Package className="h-6 w-6 text-gray-500" />
          </div>

          <h3 className="mt-5 text-lg font-semibold">
            No orders yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            New customer orders will
            appear here.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Order
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Products
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Total
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Payment
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map(
                (order) => (
                  <tr
                    key={order._id}
                    className="transition-colors duration-200 hover:bg-gray-50/70"
                  >
                    {/* Order */}

                    <td className="px-6 py-5">
                      <p className="font-semibold text-gray-900">
                        #
                        {order._id
                          .slice(-8)
                          .toUpperCase()}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </td>

                    {/* Customer */}

                    <td className="px-6 py-5">
                      <p className="font-medium text-gray-900">
                        {
                          order
                            .customer
                            .name
                        }
                      </p>

                      {order.customer
                        .email && (
                        <p className="mt-1 max-w-[190px] truncate text-xs text-gray-500">
                          {
                            order
                              .customer
                              .email
                          }
                        </p>
                      )}
                    </td>

                    {/* Products */}

                    <td className="px-6 py-5">
                      <p className="max-w-[220px] truncate font-medium text-gray-800">
                        {
                          order
                            .items[0]
                            ?.title
                        }
                      </p>

                      {order.items
                        .length > 1 && (
                        <p className="mt-1 text-xs text-gray-500">
                          +
                          {order
                            .items
                            .length -
                            1}{" "}
                          more item
                          {order
                            .items
                            .length -
                            1 >
                          1
                            ? "s"
                            : ""}
                        </p>
                      )}
                    </td>

                    {/* Total */}

                    <td className="px-6 py-5">
                      <p className="font-semibold">
                        ₹
                        {order.total.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {
                          order.paymentMethod
                        }
                      </p>
                    </td>

                    {/* Payment */}

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex min-w-[90px] items-center justify-center rounded-full px-4 py-2 text-xs font-semibold leading-none ${getPaymentBadge(
                          order.paymentStatus
                        )}`}
                      >
                        {
                          order.paymentStatus
                        }
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex min-w-[110px] items-center justify-center rounded-full px-4 py-2 text-xs font-semibold leading-none ${getOrderBadge(
                          order.orderStatus
                        )}`}
                      >
                        {formatStatus(
                          order.orderStatus
                        )}
                      </span>
                    </td>

                    {/* Action */}

                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="inline-flex min-h-10 items-center justify-center rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold leading-none transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}