"use client";

import { useEffect } from "react";

import { ProductCard } from "./product-card";
import { useWishlistStore } from "@/stores/wishlist-store";

type Product = {
  _id: string;
  title: string;
  images: string[];
  price: number;
  rating: number;
  reviews: number;
  featured: boolean;
};

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({
  products,
}: ProductGridProps) {
  const fetchWishlist =
    useWishlistStore(
      (state) => state.fetchWishlist
    );

  useEffect(() => {
    fetchWishlist().catch(() => {});
  }, [fetchWishlist]);

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          title={product.title}
          image={product.images[0]}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
          badge={
            product.featured
              ? "Featured"
              : "New"
          }
        />
      ))}
    </div>
  );
}