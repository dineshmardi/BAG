
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderSuccessPage() {
    return (
        <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
            <div className="rounded-2xl border bg-white p-10 shadow-sm">
                <h1 className="mb-4 text-4xl font-bold text-green-600">
                    🎉 Order Placed!
                </h1>

                <p className="mb-8 text-muted-foreground">
                    Thank you for your purchase.
                    Your order has been placed successfully.
                </p>

                <Link href="/">
                    <Button>
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </main>
    );
}