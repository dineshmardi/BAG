import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { getOrderById } from "@/lib/services/order.service";

import { OrderDetailsPage } from "@/components/orders/order-details-page";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderPage({
  params,
}: PageProps) {
  await connectDB();


  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <OrderDetailsPage
      order={JSON.parse(JSON.stringify(order))}
      isAdmin
    />
  );
}