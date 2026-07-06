import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold">
        Your cart is empty
      </h1>

      <p className="mt-4 text-muted-foreground">
        Looks like you haven't added any products yet.
      </p>

      <Link href="/">
        <Button className="mt-8">
          Continue Shopping
        </Button>
      </Link>
    </main>
  );
}