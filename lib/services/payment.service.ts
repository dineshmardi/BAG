import { razorpay } from "@/lib/razorpay";

type CreateRazorpayOrderInput = {
  amount: number;
  currency?: string;
  receipt?: string;
};

export async function createRazorpayOrder({
  amount,
  currency = "INR",
  receipt,
}: CreateRazorpayOrderInput) {
  return razorpay.orders.create({
    amount: amount * 100,
    currency,
    receipt,
  });
}