"use client";

import {
  Gem,
  Sparkles,
} from "lucide-react";

type MaintenancePageProps = {
  title: string;
  message: string;
};

export function MaintenancePage({
  title,
  message,
}: MaintenancePageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f1e8]">
      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#b38a3c]/10" />

        <div className="absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full border border-[#b38a3c]/10" />

        <div className="absolute -bottom-48 -right-36 h-[500px] w-[500px] rounded-full bg-[#d7b875]/10 blur-3xl" />
      </div>

      {/* =========================
          MAIN LAYOUT
      ========================= */}

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">

        {/* =========================
            LEFT CONTENT
        ========================= */}

        <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-14 xl:px-24">
          <div className="w-full max-w-xl">

            {/* =========================
                BRAND
            ========================= */}

            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black shadow-lg sm:h-12 sm:w-12">
                <Gem
                  className="h-5 w-5 text-white"
                  strokeWidth={1.7}
                />
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight text-black sm:text-xl">
                  Luxe Bags
                </p>

                <p className="mt-0.5 text-[9px] font-semibold tracking-[0.25em] text-[#9b762e] sm:text-[10px]">
                  TIMELESS LUXURY
                </p>
              </div>
            </div>

            {/* =========================
                MOBILE VISUAL
            ========================= */}

            <div className="mt-10 flex justify-center lg:hidden">
              <div className="relative flex h-40 w-40 items-center justify-center">

                {/* Outer rotating circle */}
                <div className="absolute inset-0 animate-[spin_25s_linear_infinite] rounded-full border border-[#a98235]/20">
                  <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#a98235]" />
                </div>

                {/* Middle circle */}
                <div className="absolute inset-4 animate-[spin_18s_linear_infinite_reverse] rounded-full border border-black/10" />

                {/* Glow */}
                <div className="absolute inset-7 animate-pulse rounded-full bg-[#d7b875]/20 blur-xl" />

                {/* Center */}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#111111] shadow-[0_15px_35px_rgba(0,0,0,0.18)]">
                  <Gem
                    className="h-10 w-10 text-[#c5a45f]"
                    strokeWidth={1.3}
                  />
                </div>
              </div>
            </div>

            {/* =========================
                STATUS LABEL
            ========================= */}

            <div className="mt-9 flex items-center justify-center gap-3 lg:mt-16 lg:justify-start">
              <span className="hidden h-px w-10 bg-[#a98235] sm:block" />

              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#a98235] lg:hidden" />

                <span className="text-[10px] font-bold tracking-[0.2em] text-[#92702f] sm:text-xs">
                  CURRENTLY REFINING
                </span>
              </div>
            </div>

            {/* =========================
                MAIN CONTENT
            ========================= */}

            <div className="mt-5 text-center lg:mt-7 lg:text-left">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#111111] sm:text-5xl lg:max-w-lg lg:text-7xl">
                {title}
              </h1>

              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#69645c] sm:text-base lg:mx-0 lg:mt-7 lg:max-w-lg lg:text-lg lg:leading-8">
                {message}
              </p>
            </div>

            {/* =========================
                STATUS
            ========================= */}

            <div className="mt-8 flex items-center justify-center gap-3 lg:mt-10 lg:justify-start">
              <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#b38a3c]/50" />

                <span className="relative h-2 w-2 rounded-full bg-[#a98235]" />
              </div>

              <p className="text-sm font-medium text-[#69645c]">
                Our boutique will reopen shortly
              </p>
            </div>

            {/* =========================
                MOBILE DECORATION
            ========================= */}

            <div className="mt-8 flex items-center justify-center gap-2 lg:hidden">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a98235] [animation-delay:-0.3s]" />

              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a98235] [animation-delay:-0.15s]" />

              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a98235]" />
            </div>

            {/* =========================
                FOOTER
            ========================= */}

            <div className="mt-10 border-t border-black/10 pt-5 text-center lg:mt-16 lg:pt-6 lg:text-left">
              <p className="text-[9px] leading-5 tracking-[0.12em] text-[#928b80] sm:text-xs sm:tracking-[0.16em]">
                © 2026 LUXE BAGS
                <span className="mx-2">·</span>
                CRAFTED FOR MODERN ELEGANCE
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            DESKTOP RIGHT VISUAL
        ========================= */}

        <section className="relative hidden min-h-screen overflow-hidden bg-[#111111] lg:flex lg:items-center lg:justify-center">

          {/* Gold Glow */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[#b9954f]/10 blur-[80px]" />

          {/* Outer Circle */}
          <div className="absolute h-[440px] w-[440px] animate-[spin_35s_linear_infinite] rounded-full border border-white/5">
            <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#c5a45f]" />
          </div>

          {/* Inner Circle */}
          <div className="absolute h-[340px] w-[340px] animate-[spin_25s_linear_infinite_reverse] rounded-full border border-[#c5a45f]/20">
            <div className="absolute bottom-4 right-12 h-2 w-2 rounded-full bg-[#c5a45f]" />
          </div>

          <div className="absolute h-[240px] w-[240px] rounded-full border border-white/10" />

          {/* Center */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[#c5a45f]/30 bg-white/[0.03] backdrop-blur-md">
              <div className="absolute inset-3 animate-pulse rounded-full border border-white/5" />

              <Gem
                className="h-16 w-16 text-[#c5a45f]"
                strokeWidth={1.2}
              />
            </div>

            <div className="mt-10 flex items-center gap-3">
              <Sparkles className="h-4 w-4 animate-pulse text-[#c5a45f]" />

              <p className="text-xs font-semibold tracking-[0.3em] text-[#c5a45f]">
                LUXURY IN PROGRESS
              </p>
            </div>

            <p className="mt-4 max-w-xs text-center text-sm leading-6 text-white/40">
              Curating an elevated experience
              for those who appreciate the
              extraordinary.
            </p>
          </div>

          {/* Vertical Text */}
          <p className="absolute right-8 top-1/2 origin-center -translate-y-1/2 rotate-90 whitespace-nowrap text-[10px] font-medium tracking-[0.35em] text-white/20">
            LUXE BAGS · ESTABLISHED 2026
          </p>

          {/* Bottom Corner */}
          <div className="absolute bottom-10 left-10">
            <div className="h-px w-16 bg-[#c5a45f]/50" />

            <p className="mt-3 text-[10px] tracking-[0.25em] text-white/30">
              PREMIUM COLLECTION
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}