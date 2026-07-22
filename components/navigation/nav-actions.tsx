"use client";

import Link from "next/link";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  Heart,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

export function NavActions() {
  const items = useCartStore(
    (state) => state.items
  );

  const {
    fetchWishlist,
    count,
  } = useWishlistStore();

  const { data: session } =
    useSession();

  useEffect(() => {
    if (session) {
      fetchWishlist().catch(() => {});
    }
  }, [session, fetchWishlist]);

  const cartCount = items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const wishlistCount =
    count();

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Wishlist */}
      <Link href="/wishlist">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Wishlist"
          className="relative"
        >
          <Heart className="h-5 w-5" />

          {wishlistCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </Button>
      </Link>

      {/* Cart */}
      <Link href="/cart">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Cart"
          className="relative"
        >
          <ShoppingBag className="h-5 w-5" />

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Button>
      </Link>

      {/* Desktop Authentication */}
      <div className="hidden xl:block">
        {session ? (
          <Button
            variant="ghost"
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="ghost">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}