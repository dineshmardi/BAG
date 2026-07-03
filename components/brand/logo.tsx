import Link from "next/link";

import { BRAND } from "@/constants/brand";

type LogoProps = {
  showTagline?: boolean;
};

export function Logo({
  showTagline = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)]">
        <span className="font-heading text-lg font-bold">
          {BRAND.shortName}
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold">
          {BRAND.name}
        </h1>

        {showTagline && (
          <p className="text-sm text-muted-foreground">
            {BRAND.tagline}
          </p>
        )}
      </div>
    </Link>
  );
}