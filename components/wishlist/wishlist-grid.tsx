"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { ProductCard } from "@/components/products/product-card";

type WishlistItem = {
  _id: string;

  productId: {
    _id: string;
    title: string;
    images: string[];
    price: number;
    featured: boolean;
    rating?: number;
    reviews?: number;
    badge?: string;
  };
};

export function WishlistGrid() {
  const [items, setItems] =
    useState<WishlistItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response =
          await axios.get(
            "/api/wishlist"
          );

        setItems(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <p>Loading wishlist...</p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <h2 className="text-2xl font-semibold">
          Your wishlist is empty
        </h2>

        <p className="mt-2 text-gray-500">
          Save products by clicking
          the ❤️ icon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <ProductCard
          key={item._id}
          id={item.productId._id}
          title={item.productId.title}
          image={item.productId.images[0] ?? ""}
          price={item.productId.price}
          rating={item.productId.rating ?? 0}
          reviews={item.productId.reviews ?? 0}
          badge={
            item.productId.featured
              ? "Featured"
              : "Wishlist"
          }
          onWishlistRemoved={() =>
            setItems((current) =>
              current.filter(
                (wishlistItem) =>
                  wishlistItem._id !== item._id
              )
            )
          }
        />
      ))}
    </div>
  );
}