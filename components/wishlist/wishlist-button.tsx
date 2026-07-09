"use client";

import { MouseEvent } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlist-store";

type WishlistButtonProps = {
    productId: string;
    onRemoved?: () => void;
};

export function WishlistButton({
    productId,
    onRemoved,
}: WishlistButtonProps) {
    const {
        add,
        remove,
        isWishlisted,
    } = useWishlistStore();

    const wishlisted =
        isWishlisted(productId);

    async function handleClick(
        e: MouseEvent<HTMLButtonElement>
    ) {
        e.preventDefault();
        e.stopPropagation();

        try {
            if (wishlisted) {
                await remove(productId);
                onRemoved?.();

                toast.success(
                    "Removed from wishlist"
                );
            } else {
                await add(productId);

                toast.success(
                    "Added to wishlist"
                );
            }
        } catch {
            toast.error(
                "Unable to update wishlist."
            );
        }
    }

    return (
        <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-4 top-4"
            aria-label="Wishlist"
            onClick={handleClick}
        >
            <Heart
                className={`h-4 w-4 transition-colors ${wishlisted
                    ? "fill-red-500 text-red-500"
                    : ""
                    }`}
            />
        </Button>
    );
}