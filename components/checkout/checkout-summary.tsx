"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loadRazorpayScript } from "@/lib/load-razorpay";

import { useCartStore } from "@/stores/cart-store";
import { useCheckoutStore } from "@/stores/checkout-store";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function CheckoutSummary() {
  const router = useRouter();

  const [isLoading, setIsLoading] =
    useState(false);

  const items = useCartStore(
    (state) => state.items
  );

  const clearCart =
    useCartStore(
      (state) => state.clearCart
    );

  const {
    selectedAddressId,
    paymentMethod,
  } = useCheckoutStore();

  const subtotal = items.reduce(
    (total, item) => {
      const effectivePrice =
        item.onSale &&
          item.salePrice !== undefined &&
          item.salePrice > 0 &&
          item.salePrice < item.price
          ? item.salePrice
          : item.price;

      return (
        total +
        effectivePrice * item.quantity
      );
    },
    0
  );

  const shipping =
    subtotal > 0 ? 0 : 0;

  const total =
    subtotal + shipping;

  async function handleCheckout() {
    if (paymentMethod === "COD") {
      return handlePlaceOrder();
    }

    return handleRazorpayPayment();
  }

  async function handlePlaceOrder() {
    if (items.length === 0) {
      toast.error(
        "Your cart is empty."
      );
      return;
    }

    if (!selectedAddressId) {
      toast.error(
        "Please select a delivery address."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response =
        await axios.post(
          "/api/orders",
          {
            addressId:
              selectedAddressId,
            paymentMethod: "COD",
            items: items.map(
              (item) => ({
                productId:
                  item._id,
                quantity:
                  item.quantity,
              })
            ),
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
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRazorpayPayment() {
    if (items.length === 0) {
      toast.error(
        "Your cart is empty."
      );
      return;
    }

    if (!selectedAddressId) {
      toast.error(
        "Please select a delivery address."
      );
      return;
    }

    setIsLoading(true);

    try {
      const orderResponse =
        await axios.post(
          "/api/orders",
          {
            addressId:
              selectedAddressId,
            paymentMethod:
              "RAZORPAY",
            items: items.map(
              (item) => ({
                productId:
                  item._id,
                quantity:
                  item.quantity,
              })
            ),
          }
        );

      const order =
        orderResponse.data;

      const loaded =
        await loadRazorpayScript();

      if (!loaded) {
        toast.error(
          "Unable to load Razorpay."
        );

        setIsLoading(false);

        return;
      }

      const razorpayResponse =
        await axios.post(
          "/api/payment/create-order",
          {
            orderId: order._id,
            amount: order.total,
          }
        );

      const razorpayOrder =
        razorpayResponse.data;

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        name: "Luxe Bags",

        description:
          "Order Payment",

        order_id:
          razorpayOrder.id,

        handler: async (
          response: any
        ) => {
          try {
            await axios.post(
              "/api/payment/verify",
              {
                orderId:
                  order._id,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              }
            );

            toast.success(
              "Payment successful!"
            );

            clearCart();

            router.push(
              `/order-success?id=${order._id}`
            );
          } catch (error) {
            console.error(error);

            toast.error(
              "Payment verification failed."
            );
          }
        },

        prefill: {
          name: "",

          email: "",
        },

        theme: {
          color: "#000000",
        },

        modal: {
          ondismiss: () => {
            toast.info(
              "Payment cancelled."
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to start payment."
      );
    } finally {
      setIsLoading(false);
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
          disabled={
            items.length === 0 ||
            isLoading
          }
          className="mt-6 w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading
            ? "Please wait..."
            : paymentMethod === "COD"
              ? "Place Order"
              : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}