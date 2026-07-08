"use client";

import { useCheckoutStore } from "@/stores/checkout-store";

export function PaymentMethod() {
  const {
    paymentMethod,
    setPaymentMethod,
  } = useCheckoutStore();

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Payment Method
      </h2>

      <div className="space-y-4">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() =>
              setPaymentMethod("COD")
            }
          />

          <div>
            <p className="font-medium">
              Cash on Delivery
            </p>

            <p className="text-sm text-gray-500">
              Pay when your order arrives.
            </p>
          </div>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
          <input
            type="radio"
            checked={
              paymentMethod ===
              "RAZORPAY"
            }
            onChange={() =>
              setPaymentMethod(
                "RAZORPAY"
              )
            }
          />

          <div>
            <p className="font-medium">
              Pay Online
            </p>

            <p className="text-sm text-gray-500">
              Secure payment via Razorpay
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}