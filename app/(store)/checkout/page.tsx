import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { CheckoutPage } from "@/components/checkout/checkout-page";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getAddressesByUserId } from "@/lib/services/address.service";

export default async function Checkout() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const addresses =
    await getAddressesByUserId(
      session.user.id
    );

  return (
    <CheckoutPage
      addresses={JSON.parse(
        JSON.stringify(addresses)
      )}
    />
  );
}