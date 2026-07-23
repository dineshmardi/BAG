"use client";

import Link from "next/link";
import {
  ArrowRight,
  Gem,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

import Container from "@/components/ui/container";

export function AboutContent() {
  return (
    <main className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden bg-[#faf9f6]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#b99756]/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#b99756]/10 blur-3xl" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto flex min-h-[540px] w-full flex-col items-center justify-center px-6 py-20 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="flex w-full flex-col items-center justify-center text-center"
          >
            {/* Badge */}
            <div className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-full border border-[#b99756]/40 bg-white px-8 shadow-sm">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="h-4 w-4 shrink-0 text-[#b99756]" />

                <span className="whitespace-nowrap text-sm font-semibold leading-none text-[#b99756]">
                  Our Story
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="mx-auto mt-6 w-full max-w-5xl text-center text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              More Than Just

              <span className="mt-3 block text-center text-[#b99756]">
                A Bag
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-muted-foreground">
              We believe the perfect bag becomes part of your journey —
              carrying your essentials, complementing your style, and
              moving with you through every moment.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/collections"
                className="inline-flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-lg"
              >
                <span className="whitespace-nowrap text-white">
                  Explore Collection
                </span>

                <ArrowRight className="h-5 w-5 shrink-0 text-white" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-14 min-w-[140px] items-center justify-center rounded-full border border-black/15 bg-white px-8 text-base font-semibold text-black shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/40 hover:shadow-md"
              >
                <span className="whitespace-nowrap">
                  Contact Us
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
            {/* LEFT STORY CARD */}
            <motion.div
              initial={{
                opacity: 0,
                x: -60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
              }}
              className="flex min-h-[440px] flex-col items-center justify-center rounded-[2rem] border bg-white p-8 text-center shadow-sm sm:p-12"
            >
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b99756]">
                Who We Are
              </p>

              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Designed for the Way
                <span className="block">
                  You Live
                </span>
              </h2>

              <div className="mx-auto mt-7 max-w-xl space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  We bring together timeless design and everyday
                  practicality. Every collection is thoughtfully
                  selected to complement different lifestyles,
                  occasions, and personalities.
                </p>

                <p>
                  From elegant handbags and versatile totes to
                  backpacks, office bags, and travel essentials,
                  we make it easier to discover something that
                  fits naturally into your everyday life.
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/collections"
                  className="group inline-flex items-center gap-3 font-semibold text-[#b99756]"
                >
                  Discover our collections

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT QUOTE CARD */}
            <motion.div
              initial={{
                opacity: 0,
                x: 60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
              }}
              whileHover={{
                y: -8,
              }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[2.5rem] bg-[#b99756]/5" />

              <div className="relative flex min-h-[440px] h-full flex-col items-center justify-center rounded-[2rem] border bg-[#faf9f6] p-8 text-center shadow-sm sm:p-12">
                <span className="text-7xl leading-none text-[#b99756]/30">
                  “
                </span>

                <p className="mx-auto mt-3 max-w-lg text-2xl font-medium leading-relaxed sm:text-3xl">
                  Style should feel effortless,
                  personal, and ready to move wherever
                  life takes you.
                </p>

                <div className="mt-8 h-px w-20 bg-[#b99756]" />

                <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  Luxe Bags
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ================= VALUES ================= */}
      <section className="w-full border-y bg-[#faf9f6] py-24 sm:py-28">
        <Container>
          {/* HEADING - FULL WIDTH CENTER */}
          <div className="flex w-full justify-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.6,
              }}
              className="flex w-full max-w-3xl flex-col items-center text-center"
            >
              <p className="w-full text-center text-sm uppercase tracking-[0.35em] text-[#b99756]">
                What Matters To Us
              </p>

              <h2 className="mt-4 w-full text-center text-4xl font-bold lg:text-5xl">
                Our Values
              </h2>

              <p className="mx-auto mt-5 w-full max-w-xl text-center leading-7 text-muted-foreground">
                The principles behind everything we do, from selecting
                our collections to creating your shopping experience.
              </p>
            </motion.div>
          </div>

          {/* CARDS */}
          <div className="mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            {/* QUALITY */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
              }}
              whileHover={{
                y: -10,
              }}
              className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border bg-white p-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#faf9f6]">
                <Gem className="h-7 w-7 text-[#b99756]" />
              </div>

              <h3 className="mt-7 w-full text-center text-2xl font-semibold">
                Quality
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-center text-base leading-7 text-muted-foreground">
                Thoughtfully selected products designed for style,
                practicality, and everyday use.
              </p>
            </motion.div>

            {/* STYLE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
              whileHover={{
                y: -10,
              }}
              className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border bg-white p-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#faf9f6]">
                <Heart className="h-7 w-7 text-[#b99756]" />
              </div>

              <h3 className="mt-7 w-full text-center text-2xl font-semibold">
                Style
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-center text-base leading-7 text-muted-foreground">
                Collections created to complement your personality,
                lifestyle, and every occasion.
              </p>
            </motion.div>

            {/* TRUST */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              whileHover={{
                y: -10,
              }}
              className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border bg-white p-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#faf9f6]">
                <ShieldCheck className="h-7 w-7 text-[#b99756]" />
              </div>

              <h3 className="mt-7 w-full text-center text-2xl font-semibold">
                Trust
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-center text-base leading-7 text-muted-foreground">
                A dependable shopping experience designed to make
                every step simple and reassuring.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto flex min-h-[420px] max-w-6xl flex-col items-center justify-center rounded-[2.5rem] bg-black px-8 py-16 text-center text-white sm:px-16"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#b99756]">
              Find Your Style
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Find the perfect companion for your next journey.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Explore our latest collections and discover
              styles designed for every moment.
            </p>

            <Link
              href="/collections"
              className="mt-8 inline-flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-full bg-[#b99756] px-8 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#a88647] hover:shadow-xl"
            >
              <span className="whitespace-nowrap text-white">
                Shop Collection
              </span>

              <ArrowRight className="h-5 w-5 shrink-0 text-white" />
            </Link>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}