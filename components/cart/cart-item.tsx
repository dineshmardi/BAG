"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

import type { CartItem as CartItemType } from "@/types/cart";

type CartItemProps = {
    item: CartItemType;
};

export function CartItem({
    item,
}: CartItemProps) {
    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );

    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity
    );

    const removeItem = useCartStore(
        (state) => state.removeItem
    );

    const effectivePrice =
        item.onSale &&
            item.salePrice !== undefined &&
            item.salePrice > 0 &&
            item.salePrice < item.price
            ? item.salePrice
            : item.price;

    return (
        <div className="flex gap-5 rounded-xl border p-5">
            <div className="relative h-28 w-28 overflow-hidden rounded-lg border">
                <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        {item.title}
                    </h2>

                    <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">
                                ₹{effectivePrice.toLocaleString("en-IN")} each
                            </span>

                            {effectivePrice !== item.price && (
                                <span className="text-sm text-muted-foreground line-through">
                                    ₹{item.price.toLocaleString("en-IN")}
                                </span>
                            )}
                        </div>

                        <p className="font-semibold">
                            Subtotal: ₹{(
                                effectivePrice * item.quantity
                            ).toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                                decreaseQuantity(item._id)
                            }
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <span className="w-8 text-center font-semibold">
                            {item.quantity}
                        </span>

                        <Button
                            variant="outline"
                            size="icon"
                            disabled={item.quantity >= item.stock}
                            onClick={() =>
                                increaseQuantity(item._id)
                            }
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                            removeItem(item._id)
                        }
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}