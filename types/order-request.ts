export type OrderRequestItem = {
  productId: string;
  quantity: number;
};

export type OrderRequest = {
  addressId: string;
  paymentMethod: "COD" | "RAZORPAY";
  items: OrderRequestItem[];
};