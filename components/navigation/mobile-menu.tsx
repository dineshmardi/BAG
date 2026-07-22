"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LogIn,
  LogOut,
} from "lucide-react";
import {
  signOut,
  useSession,
} from "next-auth/react";

import { Button } from "@/components/ui/button";
import { NAVIGATION } from "@/constants/navigation";

export function MobileMenu() {
  const [open, setOpen] =
    useState(false);

  const { data: session } =
    useSession();

  return (
    <div className="xl:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={
          open
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        onClick={() =>
          setOpen(
            (current) => !current
          )
        }
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {open && (
        <div className="absolute left-0 top-20 w-full border-b bg-background shadow-lg">
          <div className="site-container py-6">
            <nav className="flex flex-col gap-1">
              {NAVIGATION.map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setOpen(false)
                    }
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-[var(--accent-hover)]"
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="my-2 border-t" />

              {session ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);

                    signOut({
                      callbackUrl:
                        "/login",
                    });
                  }}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}