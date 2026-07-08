export type OrderItem = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type Order = {
  _id: string;

  userId: string;
  addressId: string;

  items: OrderItem[];

  subtotal: number;
  shipping: number;
  total: number;

  paymentMethod: "COD" | "RAZORPAY";

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

  orderStatus:
    | "PLACED"
    | "CONFIRMED"
    | "PACKED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";

  // NEW
  razorpayOrderId?: string;

  razorpayPaymentId?: string;

  razorpaySignature?: string;

  createdAt?: string;
  updatedAt?: string;
};