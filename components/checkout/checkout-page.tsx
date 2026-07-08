"use client";

import type { Address } from "@/types/address";

import { AddressSelector } from "./address-selector";
import { CheckoutSummary } from "./checkout-summary";
import { PaymentMethod } from "./payment-method";

type CheckoutPageProps = {
  addresses: Address[];
};

export function CheckoutPage({
  addresses,
}: CheckoutPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Checkout
        </h1>

        <p className="mt-2 text-muted-foreground">
          Review your order before payment.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <AddressSelector
            addresses={addresses}
          />

          <PaymentMethod />
        </div>

        <div>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  );
}