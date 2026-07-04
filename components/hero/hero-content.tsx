import { BRAND } from "@/constants/brand";

export function HeroContent() {
  return (
    <div className="max-w-2xl space-y-6">
      <span className="inline-block rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground">
        Premium Collection 2026
      </span>

      <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
        Crafted for
        <span className="block text-[var(--accent-hover)]">
          Modern Elegance
        </span>
      </h1>

      <p className="text-lg leading-8 text-muted-foreground">
        Discover timeless handbags and premium leather accessories
        designed to complement every occasion with style,
        elegance, and confidence.
      </p>

      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
        {BRAND.tagline}
      </p>
    </div>
  );
}