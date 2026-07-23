"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  MessageSquare,
  Settings,
  Store,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r border-white/10 bg-[#0a0a0a] text-white lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex h-24 items-center border-b border-white/10 px-7">
        <Link
          href="/admin"
          className="flex items-center gap-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white text-base font-bold text-black">
            LB
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Luxe Bags
            </h1>

            <p className="mt-0.5 text-xs tracking-[0.16em] text-[#c7a55b]">
              ADMIN PANEL
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-7">
        <p className="mb-4 px-4 text-[11px] font-semibold tracking-[0.2em] text-white/40">
          MANAGEMENT
        </p>

        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(
                    item.href
                  );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group
                  relative
                  flex
                  min-h-12
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/65 hover:bg-white/[0.07] hover:text-white"
                  }
                `}
              >
                {/* Active Gold Line */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#b99756]" />
                )}

                {/* Icon */}
                <Icon
                  className={`
                    h-5
                    w-5
                    shrink-0
                    transition-colors
                    duration-200
                    ${
                      isActive
                        ? "text-[#c7a55b]"
                        : "text-white/50 group-hover:text-[#c7a55b]"
                    }
                  `}
                />

                {/* Text */}
                <span
                  className={`
                    flex-1
                    transition-colors
                    duration-200
                    ${
                      isActive
                        ? "text-white"
                        : "text-white/65 group-hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#b99756]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="
            group
            flex
            min-h-12
            items-center
            gap-4
            rounded-xl
            px-4
            py-3
            text-sm
            font-semibold
            text-white/65
            transition-all
            duration-200
            hover:bg-white/[0.07]
            hover:text-white
          "
        >
          <Store className="h-5 w-5 shrink-0 text-white/50 transition-colors duration-200 group-hover:text-[#c7a55b]" />

          <span className="group-hover:text-white">
            View Store
          </span>
        </Link>
      </div>
    </aside>
  );
}