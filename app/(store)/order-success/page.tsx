"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Check,
    PackageCheck,
    ShoppingBag,
} from "lucide-react";

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();

    const orderId = searchParams.get("id");

    const shortOrderId = orderId
        ? orderId.slice(-8).toUpperCase()
        : null;

    return (
        <main className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[15%] top-[25%] h-48 w-48 animate-pulse rounded-full bg-green-50 blur-3xl" />

                <div className="absolute bottom-[15%] right-[15%] h-48 w-48 animate-pulse rounded-full bg-amber-50 blur-3xl" />
            </div>

            {/* Success Card */}
            <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-lg sm:px-12 sm:py-14">
                {/* Animated Success Icon */}
                <div className="mx-auto flex justify-center">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        {/* Continuous pulse */}
                        <span className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-40" />

                        <span className="absolute inset-2 animate-pulse rounded-full bg-green-100" />

                        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-md">
                            <Check
                                className="h-10 w-10 text-white"
                                strokeWidth={3}
                            />
                        </div>
                    </div>
                </div>

                {/* Confirmation Badge */}
                <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center justify-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                        <PackageCheck className="h-4 w-4 shrink-0" />

                        <span>
                            Order Confirmed
                        </span>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="mt-5 text-center text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                    Order Placed Successfully!
                </h1>

                {/* Description */}
                <div className="mt-4 flex w-full justify-center">
                    <p className="w-full max-w-lg !text-center text-base leading-7 text-gray-500">
                        Thank you for shopping with Luxe Bags.
                        Your order has been received and is now
                        being processed.
                    </p>
                </div>

                {/* Order ID */}
                {shortOrderId && (
                    <div className="mt-8 flex w-full justify-center">
                        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center">
                            <p className="w-full text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                                Your Order ID
                            </p>

                            <p className="mt-2 w-full text-center font-mono text-lg font-bold tracking-wider text-gray-950">
                                #{shortOrderId}
                            </p>
                        </div>
                    </div>
                )}

                {/* Processing Status */}
                <div className="mt-7 flex items-center justify-center gap-3">
                    <span className="relative flex h-3 w-3 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                    </span>

                    <span className="text-sm font-medium text-gray-500">
                        We're preparing your order
                    </span>
                </div>

                {/* Continue Shopping */}
                <div className="mt-8 flex w-full justify-center">
                    <Link
                        href="/"
                        className="inline-flex min-h-[52px] min-w-[230px] items-center justify-center gap-3 rounded-xl bg-black px-8 py-3 font-semibold !text-white no-underline shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:!text-white hover:shadow-md"
                    >
                        <ShoppingBag className="h-5 w-5 shrink-0 !text-white" />

                        <span className="!text-white">
                            Continue Shopping
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    );
}