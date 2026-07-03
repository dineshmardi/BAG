import Link from "next/link";

import { NAVIGATION } from "@/constants/navigation";

export function NavLinks() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {NAVIGATION.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative text-sm font-medium transition-colors hover:text-[var(--accent-hover)]"
        >
          {item.label}

          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[var(--accent-hover)] transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}