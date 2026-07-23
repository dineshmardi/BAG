"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  signOut,
  useSession,
} from "next-auth/react";

import {
  Heart,
  ShoppingBag,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  useCartStore,
} from "@/stores/cart-store";

import {
  useWishlistStore,
} from "@/stores/wishlist-store";

export function NavActions() {
  const items = useCartStore(
    (state) => state.items
  );

  const {
    fetchWishlist,
    count,
  } = useWishlistStore();

  const {
    data: session,
  } = useSession();

  useEffect(() => {
    if (session) {
      fetchWishlist().catch(
        () => { }
      );
    }
  }, [
    session,
    fetchWishlist,
  ]);

  const cartCount =
    items.reduce(
      (total, item) =>
        total +
        item.quantity,
      0
    );

  const wishlistCount =
    count();

  return (
    <div className="flex items-center gap-1 sm:gap-2">

      {/* =========================
          WISHLIST
      ========================= */}

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

      {/* =========================
          CART
      ========================= */}

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

      {/* =========================
          DESKTOP AUTHENTICATION
      ========================= */}

      {/* Authentication */}
      <div className="hidden xl:flex xl:items-center xl:gap-2">
        {session ? (
          <Button
            variant="ghost"
            className="px-2 text-xs sm:px-4 sm:text-sm"
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md px-2 text-xs font-medium transition-colors hover:bg-gray-100 sm:h-10 sm:px-4 sm:text-sm"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-md bg-black px-3 text-xs font-semibold !text-white no-underline transition-all hover:bg-gray-800 hover:!text-white sm:h-10 sm:px-5 sm:text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}