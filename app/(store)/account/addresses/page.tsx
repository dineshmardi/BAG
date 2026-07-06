import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AddressDashboard } from "@/components/address/address-dashboard";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getAddressesByUserId } from "@/lib/services/address.service";

export default async function AddressesPage() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const addresses = await getAddressesByUserId(
    session.user.id
  );

  return (
    <AddressDashboard
      addresses={JSON.parse(JSON.stringify(addresses))}
    />
  );
}