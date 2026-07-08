"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

type CartStore = {
  items: CartItem[];

  addItem: (product: Product, quantity?: number) => void;

  removeItem: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          // Prevent out-of-stock products
          if (product.stock <= 0) {
            return state;
          }

          const existing = state.items.find(
            (item) => item._id === product._id
          );

          if (existing) {
            const newQuantity =
              Math.min(
                existing.quantity + quantity,
                product.stock
              );

            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? {
                    ...item,
                    quantity: newQuantity,
                  }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: Math.min(
                  quantity,
                  product.stock
                ),
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item._id !== id
          ),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === id
              ? {
                ...item,
                quantity: item.quantity + 1,
              }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item._id === id
                ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "shopping-cart",
    }
  )
);