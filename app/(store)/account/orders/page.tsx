import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getOrdersByUserId } from "@/lib/services/order.service";

import { OrdersPage } from "@/components/orders/orders-page";

export default async function MyOrdersPage() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const orders = await getOrdersByUserId(
    session.user.id
  );

  return (
    <OrdersPage
      orders={JSON.parse(
        JSON.stringify(orders)
      )}
    />
  );
}