"use client";

import axios from "axios";
import { create } from "zustand";

type WishlistStore = {
  productIds: string[];

  fetchWishlist: () => Promise<void>;

  add: (productId: string) => Promise<void>;

  remove: (productId: string) => Promise<void>;

  isWishlisted: (
    productId: string
  ) => boolean;

  count: () => number;
};

export const useWishlistStore =
  create<WishlistStore>((set, get) => ({
    productIds: [],

    fetchWishlist: async () => {
      const response =
        await axios.get("/api/wishlist");

      set({
        productIds: response.data.map(
          (item: any) =>
            item.productId._id
        ),
      });
    },

    add: async (productId) => {
      await axios.post(
        "/api/wishlist",
        {
          productId,
        }
      );

      set((state) => ({
        productIds: [
          ...state.productIds,
          productId,
        ],
      }));
    },

    remove: async (productId) => {
      await axios.delete(
        "/api/wishlist",
        {
          data: {
            productId,
          },
        }
      );

      set((state) => ({
        productIds:
          state.productIds.filter(
            (id) =>
              id !== productId
          ),
      }));
    },

    isWishlisted: (
      productId
    ) =>
      get().productIds.includes(
        productId
      ),

    count: () =>
      get().productIds.length,
  }));