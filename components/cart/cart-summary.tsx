"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

export function CartSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (sum, item) => {
      const effectivePrice =
        item.onSale &&
          item.salePrice !== undefined &&
          item.salePrice > 0 &&
          item.salePrice < item.price
          ? item.salePrice
          : item.price;

      return sum + effectivePrice * item.quantity;
    },
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  return (
    <div className="sticky top-28 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span className="font-medium text-green-600">
            FREE
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span>
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <Link href="/checkout">
        <Button
          className="mt-8 w-full"
          size="lg"
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/">
        <Button
          variant="outline"
          className="mt-3 w-full"
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}