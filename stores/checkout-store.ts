"use client";

import { create } from "zustand";

export type PaymentMethod =
  | "COD"
  | "RAZORPAY";

type CheckoutStore = {
  selectedAddressId: string;

  paymentMethod: PaymentMethod;

  setSelectedAddress: (
    id: string
  ) => void;

  setPaymentMethod: (
    method: PaymentMethod
  ) => void;
};

export const useCheckoutStore =
  create<CheckoutStore>((set) => ({
    selectedAddressId: "",

    paymentMethod: "COD",

    setSelectedAddress: (id) =>
      set({
        selectedAddressId: id,
      }),

    setPaymentMethod: (method) =>
      set({
        paymentMethod: method,
      }),
  }));