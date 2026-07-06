"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Heart,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

export function NavActions() {
  const items = useCartStore((state) => state.items);

  const { data: session } = useSession();

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Wishlist"
      >
        <Heart className="h-5 w-5" />
      </Button>

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
  );
}