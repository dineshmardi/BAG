import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroButtons() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/shop">
                <Button size="lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>

            <Link href="/collections">
                <Button variant="outline" size="lg">
                    Explore Collection
                </Button>
            </Link>
        </div>
    );
}