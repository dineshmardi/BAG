import axios from "axios";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

type CreateOrderInput = {
  addressId: string;
  paymentMethod: "COD" | "RAZORPAY";
  items: CheckoutItem[];
};

export async function createCheckoutOrder(
  data: CreateOrderInput
) {
  const response = await axios.post(
    "/api/orders",
    data
  );

  return response.data;
}

export async function createCheckoutPayment(
  orderId: string,
  amount: number
) {
  const response = await axios.post(
    "/api/payment/create-order",
    {
      orderId,
      amount,
    }
  );

  return response.data;
}

export async function verifyCheckoutPayment(
  data: {
    orderId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
) {
  const response = await axios.post(
    "/api/payment/verify",
    data
  );

  return response.data;
}