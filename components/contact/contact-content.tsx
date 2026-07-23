"use client";

import Link from "next/link";
import {
    ArrowRight,
    Clock3,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

import Container from "@/components/ui/container";

export function ContactContent() {
    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        // Store reference before async operation
        const form =
            event.currentTarget;

        setIsSubmitting(true);

        try {
            const formData =
                new FormData(form);

            const data = {
                name:
                    formData.get("name"),
                email:
                    formData.get("email"),
                subject:
                    formData.get(
                        "subject"
                    ),
                message:
                    formData.get(
                        "message"
                    ),
            };

            const response =
                await fetch(
                    "/api/contact",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify(
                            data
                        ),
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Failed to send message."
                );
            }

            toast.success(
                "Thanks! Your message has been received."
            );

            // Safely clear the form
            form.reset();
        } catch (error) {
            console.error(
                "Contact form error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to send message. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="w-full max-w-full overflow-x-clip">
            {/* ================= HERO ================= */}
            <section className="relative w-full overflow-hidden bg-[#faf9f6]">
                {/* Decorative background */}
                <motion.div
                    className="pointer-events-none absolute left-[8%] top-[15%] h-72 w-72 rounded-full bg-[#b99756]/10 blur-[100px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 25, 0],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="pointer-events-none absolute bottom-[5%] right-[8%] h-80 w-80 rounded-full bg-[#b99756]/10 blur-[110px]"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -25, 0],
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="relative mx-auto flex min-h-[500px] w-full flex-col items-center justify-center px-6 py-20 text-center">
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
                        className="flex w-full max-w-4xl flex-col items-center justify-center text-center"
                    >
                        {/* Badge */}
                        <div className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full border border-[#b99756]/40 bg-white px-8 shadow-sm">
                            <div className="flex items-center justify-center gap-3">
                                <Sparkles className="h-4 w-4 shrink-0 text-[#b99756]" />

                                <span className="whitespace-nowrap text-sm font-semibold leading-none text-[#b99756]">
                                    Get In Touch
                                </span>
                            </div>
                        </div>

                        <h1 className="mx-auto mt-7 w-full text-center text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                            We&apos;d Love to
                            <span className="mt-2 block text-[#b99756]">
                                Hear From You
                            </span>
                        </h1>

                        <p className="mx-auto mt-7 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
                            Have a question about a product, your order,
                            or anything else? Our team is here to help
                            make your Luxe Bags experience effortless.
                        </p>

                        <motion.a
                            href="#contact-form"
                            whileHover={{
                                y: -3,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            className="mt-9 inline-flex h-14 min-w-[210px] items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-semibold text-white shadow-md transition-shadow hover:shadow-xl"
                        >
                            <span className="whitespace-nowrap text-white">
                                Send a Message
                            </span>

                            <ArrowRight className="h-5 w-5 shrink-0 text-white" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* ================= CONTACT OPTIONS ================= */}
            <section className="bg-white py-16 sm:py-20">
                <Container>
                    {/* Heading */}
                    <div className="flex w-full justify-center">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.25,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            className="w-full max-w-2xl text-center"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b99756]">
                                Contact Us
                            </p>

                            <h2 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
                                How Can We Help?
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                                Choose the easiest way to reach us. We&apos;ll do our best
                                to get back to you as soon as possible.
                            </p>
                        </motion.div>
                    </div>

                    {/* Cards */}
                    <div className="mt-10 grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <ContactCard
                            icon={Mail}
                            title="Email Us"
                            description="For general questions and support."
                            value="dineshmardi9334@gmail.com"
                            delay={0}
                        />

                        <ContactCard
                            icon={Phone}
                            title="Call Us"
                            description="Speak directly with our support team."
                            value="+91 9334222630"
                            delay={0.1}
                        />

                        <ContactCard
                            icon={MapPin}
                            title="Our Location"
                            description="Visit or reach our team."
                            value="India"
                            delay={0.2}
                        />

                        <ContactCard
                            icon={Clock3}
                            title="Working Hours"
                            description="We are available to assist you."
                            value="Mon – Sat, 9 AM – 6 PM"
                            delay={0.3}
                        />
                    </div>
                </Container>
            </section>
            {/* ================= FORM SECTION ================= */}
            <section
                id="contact-form"
                className="scroll-mt-24 bg-[#faf9f6] py-20 sm:py-24"
            >
                <Container>
                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* ================= LEFT SIDE ================= */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                            className="relative min-h-[620px] overflow-hidden rounded-[2rem] bg-black text-white"
                        >
                            <div className="flex min-h-[620px] w-full flex-col items-center justify-center px-8 py-12 text-center sm:px-12 lg:px-16">

                                {/* Icon */}
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                                    <MessageCircle className="h-6 w-6 text-[#b99756]" />
                                </div>

                                {/* Small Heading */}
                                <p className="mt-7 text-sm font-medium uppercase tracking-[0.28em] text-[#b99756]">
                                    Let&apos;s Talk
                                </p>

                                {/* Main Heading */}
                                <h2 className="mx-auto mt-4 max-w-[520px] text-center text-4xl font-bold leading-[1.15] sm:text-5xl">
                                    Have something on your mind?
                                </h2>

                                {/* Description */}
                                <p className="mx-auto mt-6 max-w-[540px] text-center text-base leading-8 text-white/70">
                                    Whether you need help choosing the right bag,
                                    have a question about an existing order, or
                                    simply want to share your feedback, send us a
                                    message and our team will be happy to assist.
                                </p>

                                {/* Divider */}
                                <div className="my-8 h-px w-full max-w-[540px] bg-white/10" />

                                {/* Contact Information */}
                                <div className="flex w-full max-w-[420px] flex-col items-center gap-5">

                                    {/* Email */}
                                    <div className="flex w-full items-center justify-center gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                                            <Mail className="h-5 w-5 text-[#b99756]" />
                                        </div>

                                        <div className="min-w-0 text-left">
                                            <p className="text-sm text-white/50">
                                                Email
                                            </p>

                                            <p className="mt-1 break-words font-medium text-white">
                                                dineshmardi9334@gmail.com
                                            </p>
                                        </div>
                                    </div>

                                    {/* Response Time */}
                                    <div className="flex w-full items-center justify-center gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                                            <Clock3 className="h-5 w-5 text-[#b99756]" />
                                        </div>

                                        <div className="text-left">
                                            <p className="text-sm text-white/50">
                                                Response Time
                                            </p>

                                            <p className="mt-1 font-medium text-white">
                                                Usually within 24 hours
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>

                        {/* ================= RIGHT SIDE / CONTACT FORM ================= */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                                ease: "easeOut",
                            }}
                            className="relative min-h-[620px] overflow-hidden rounded-[2rem] border bg-white shadow-sm"
                        >
                            <div className="flex min-h-[620px] flex-col justify-center px-8 py-12 sm:px-12 lg:px-14">

                                {/* Form Header */}
                                <div className="text-center">
                                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#b99756]">
                                        Send A Message
                                    </p>

                                    <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                                        Contact our team
                                    </h2>

                                    <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-muted-foreground">
                                        Fill in the form below and we&apos;ll get back to you shortly.
                                    </p>
                                </div>

                                {/* Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="mx-auto mt-8 w-full max-w-[560px] space-y-5"
                                >
                                    {/* Name + Email */}
                                    <div className="grid gap-5 sm:grid-cols-2">

                                        {/* Name */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="mb-2 block text-sm font-medium"
                                            >
                                                Your Name
                                            </label>

                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="Enter your name"
                                                className="h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition focus:border-[#b99756] focus:ring-2 focus:ring-[#b99756]/15"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-2 block text-sm font-medium"
                                            >
                                                Email Address
                                            </label>

                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="Enter your email"
                                                className="h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition focus:border-[#b99756] focus:ring-2 focus:ring-[#b99756]/15"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-medium"
                                        >
                                            Subject
                                        </label>

                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            placeholder="How can we help?"
                                            className="h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition focus:border-[#b99756] focus:ring-2 focus:ring-[#b99756]/15"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-medium"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            placeholder="Tell us more about your query..."
                                            className="w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#b99756] focus:ring-2 focus:ring-[#b99756]/15"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-center pt-2">
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={
                                                isSubmitting
                                                    ? {}
                                                    : {
                                                        y: -2,
                                                    }
                                            }
                                            whileTap={
                                                isSubmitting
                                                    ? {}
                                                    : {
                                                        scale: 0.98,
                                                    }
                                            }
                                            className="inline-flex h-14 min-w-[210px] items-center justify-center gap-3 rounded-full bg-black px-8 text-base font-semibold text-white shadow-sm transition-shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <span className="whitespace-nowrap">
                                                {isSubmitting
                                                    ? "Sending..."
                                                    : "Send Message"}
                                            </span>

                                            {!isSubmitting && (
                                                <Send className="h-4 w-4 shrink-0" />
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                    </div>
                </Container>
            </section>
            {/* ================= FINAL CTA ================= */}
            <section className="bg-white py-20 sm:py-24">
                <Container>
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
                            amount: 0.25,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="flex min-h-[360px] w-full flex-col items-center justify-center rounded-[2.5rem] bg-black px-8 py-16 text-center text-white sm:px-14"
                    >
                        <p className="w-full text-center text-sm uppercase tracking-[0.3em] text-[#b99756]">
                            Continue Exploring
                        </p>

                        <h2 className="mx-auto mt-5 max-w-3xl text-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                            Your next favorite bag might be waiting.
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-center leading-7 text-white/65">
                            Explore our collection and find something
                            designed to move through every moment with you.
                        </p>

                        <Link
                            href="/shop"
                            className="mt-9 inline-flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-full bg-[#b99756] px-8 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#a88647] hover:shadow-xl"
                        >
                            <span className="whitespace-nowrap text-white">
                                Explore Collection
                            </span>

                            <ArrowRight className="h-5 w-5 shrink-0 text-white" />
                        </Link>
                    </motion.div>
                </Container>
            </section>
        </main>
    );
}

type ContactCardProps = {
    icon: React.ElementType;
    title: string;
    description: string;
    value: string;
    delay: number;
};

function ContactCard({
    icon: Icon,
    title,
    description,
    value,
    delay,
}: ContactCardProps) {
    return (
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
                amount: 0.25,
            }}
            transition={{
                duration: 0.5,
                delay,
            }}
            whileHover={{
                y: -8,
            }}
            className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border bg-white p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
        >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf9f6]">
                <Icon className="h-6 w-6 text-[#b99756]" />
            </div>

            <h3 className="mt-6 w-full text-center text-xl font-semibold">
                {title}
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-6 text-muted-foreground">
                {description}
            </p>

            <p className="mx-auto mt-4 max-w-full break-words text-center text-sm font-semibold">
                {value}
            </p>
        </motion.div>
    );
}