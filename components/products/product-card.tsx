"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/wishlist/wishlist-button";
import { ProductRating } from "./product-rating";

type ProductCardProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  badge: string;
  onWishlistRemoved?: () => void;

};

export function ProductCard({
  id,
  title,
  image,
  price,
  rating,
  reviews,
  badge,
  onWishlistRemoved,

}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            {badge}
          </span>

          <WishlistButton
            productId={id}
            onRemoved={onWishlistRemoved}
          />
        </div>

        <div className="space-y-3 p-5">
          <ProductRating
            rating={rating}
            reviews={reviews}
          />

          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">
              ₹{price.toLocaleString("en-IN")}
            </span>

            <Button>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}