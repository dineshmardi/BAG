import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getOrderById } from "@/lib/services/order.service";

import { OrderDetailsPage } from "@/components/orders/order-details-page";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({
  params,
}: PageProps) {
  await connectDB();

  const session =
    await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const order =
    await getOrderById(id);

  if (!order) {
    notFound();
  }

  if (
    order.userId.toString() !==
    session.user.id
  ) {
    redirect("/account/orders");
  }

  return (
    <OrderDetailsPage
      order={JSON.parse(
        JSON.stringify(order)
      )}
    />
  );
}