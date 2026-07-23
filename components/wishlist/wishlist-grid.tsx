"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import Link from "next/link";

import {
  Heart,
  ShoppingBag,
} from "lucide-react";

import {
  ProductCard,
} from "@/components/products/product-card";

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

        setItems(
          response.data
        );
      } catch (error) {
        console.error(
          "Failed to fetch wishlist:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[350px] w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-red-100 opacity-60" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Heart className="h-6 w-6 animate-pulse text-red-500" />
            </div>
          </div>

          <p className="!text-center text-sm font-medium text-gray-500">
            Loading your wishlist...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // EMPTY WISHLIST
  // =========================

  if (items.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-6">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-14">

          {/* Background Glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-red-50/70 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center">

            {/* Animated Heart */}
            <div className="relative flex h-28 w-28 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-red-100 opacity-30" />

              <span className="absolute inset-3 animate-pulse rounded-full bg-red-100/80" />

              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-red-100 bg-white shadow-md">
                <Heart
                  className="h-9 w-9 animate-pulse text-red-500"
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Heading */}
            <h2 className="mt-7 w-full !text-center text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Your wishlist is empty
            </h2>

            {/* Description */}
            <div className="mt-3 flex w-full justify-center">
              <p className="max-w-md !text-center text-base leading-7 text-gray-500">
                You haven't saved any products yet.
                Explore our collection and tap the heart
                icon to save your favorite bags.
              </p>
            </div>

            {/* Status */}
            <div className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-red-50 px-4 py-2">
              <Heart className="h-4 w-4 animate-pulse text-red-500" />

              <span className="text-sm font-medium text-red-600">
                Your favorites will appear here
              </span>
            </div>

            {/* Explore Button */}
            <div className="mt-8 flex w-full justify-center">
              <Link
                href="/shop"
                className="inline-flex min-h-[52px] min-w-[220px] items-center justify-center gap-3 rounded-xl bg-black px-8 py-3 font-semibold !text-white no-underline shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:!text-white hover:shadow-md"
              >
                <ShoppingBag className="h-5 w-5 shrink-0 !text-white" />

                <span className="!text-white">
                  Explore Products
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // WISHLIST PRODUCTS
  // =========================

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(
        (item) => (
          <ProductCard
            key={
              item._id
            }
            id={
              item.productId
                ._id
            }
            title={
              item.productId
                .title
            }
            image={
              item.productId
                .images[0] ??
              ""
            }
            price={
              item.productId
                .price
            }
            rating={
              item.productId
                .rating ??
              0
            }
            reviews={
              item.productId
                .reviews ??
              0
            }
            badge={
              item.productId
                .featured
                ? "Featured"
                : "Wishlist"
            }
            onWishlistRemoved={() =>
              setItems(
                (
                  current
                ) =>
                  current.filter(
                    (
                      wishlistItem
                    ) =>
                      wishlistItem
                        ._id !==
                      item._id
                  )
              )
            }
          />
        )
      )}
    </div>
  );
}