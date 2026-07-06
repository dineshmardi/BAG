import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        My Profile
      </h1>

      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
        <p>
          <strong>Name:</strong> {session.user.name}
        </p>

        <p>
          <strong>Email:</strong> {session.user.email}
        </p>

        <p>
          <strong>Role:</strong> {session.user.role}
        </p>

        <p>
          <strong>User ID:</strong> {session.user.id}
        </p>
      </div>
    </main>
  );
}