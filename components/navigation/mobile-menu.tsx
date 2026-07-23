"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  Menu,
  X,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";

import {
  signOut,
  useSession,
} from "next-auth/react";

import {
  Button,
} from "@/components/ui/button";

import {
  NAVIGATION,
} from "@/constants/navigation";

export function MobileMenu() {
  const [open, setOpen] =
    useState(false);

  const {
    data: session,
  } = useSession();

  return (
    <div className="xl:hidden">
      {/* Menu Button */}
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
            (current) =>
              !current
          )
        }
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute left-0 top-20 z-50 w-full border-b bg-background shadow-lg">
          <div className="site-container py-6">
            <nav className="flex flex-col gap-1">

              {/* Navigation Links */}
              {NAVIGATION.map(
                (item) => (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    onClick={() =>
                      setOpen(
                        false
                      )
                    }
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-[var(--accent-hover)]"
                  >
                    {
                      item.label
                    }
                  </Link>
                )
              )}

              <div className="my-3 border-t" />

              {/* =========================
                  AUTHENTICATION
              ========================= */}

              {session ? (
                /* Logged In */
                <button
                  type="button"
                  onClick={() => {
                    setOpen(
                      false
                    );

                    signOut({
                      callbackUrl:
                        "/login",
                    });
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted"
                >
                  <LogOut className="h-4 w-4 shrink-0" />

                  <span>
                    Logout
                  </span>
                </button>
              ) : (
                /* Logged Out */
                <div className="flex flex-col gap-2">

                  {/* Login */}
                  <Link
                    href="/login"
                    onClick={() =>
                      setOpen(
                        false
                      )
                    }
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <LogIn className="h-4 w-4 shrink-0" />

                    <span>
                      Login
                    </span>
                  </Link>

                  {/* Register */}
                  <Link
                    href="/register"
                    onClick={() =>
                      setOpen(
                        false
                      )
                    }
                    className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-semibold !text-white no-underline transition-all duration-200 hover:bg-gray-800 hover:!text-white"
                  >
                    <UserPlus className="h-4 w-4 shrink-0 text-white" />

                    <span>
                      Create an Account
                    </span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}