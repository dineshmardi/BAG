"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCartStore } from "@/stores/cart-store";
import { useCheckoutStore } from "@/stores/checkout-store";

export function CheckoutSummary() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const {
    selectedAddressId,
    paymentMethod,
  } = useCheckoutStore();

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  async function handleCheckout() {
    if (paymentMethod === "COD") {
      return handlePlaceOrder();
    }

    return handleRazorpayPayment();
  }
  async function handleRazorpayPayment() {
    toast.info(
      "Razorpay integration in progress."
    );
  }

  async function handlePlaceOrder() {
    if (items.length === 0) {
      toast.error("Your cart is empty.");

      return;
    }

    if (!selectedAddressId) {
      toast.error(
        "Please select a delivery address."
      );

      return;
    }

    try {
      const response = await axios.post(
        "/api/orders",
        {
          addressId: selectedAddressId,
          paymentMethod,
          items: items.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }
      );

      toast.success(
        "Order placed successfully!"
      );

      clearCart();

      router.push(
        `/order-success?id=${response.data._id}`
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to place order."
      );
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>
            Items ({items.length})
          </span>

          <span>
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span>
            {shipping === 0
              ? "Free"
              : `₹${shipping}`}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className="mt-6 w-full rounded-lg bg-black py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {paymentMethod === "COD"
            ? "Place Order"
            : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}