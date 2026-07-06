"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./quantity-selector";
import { useCartStore } from "@/stores/cart-store";

import type { Product } from "@/types/product";

type AddToCartProps = {
  product: Product;
};

export function AddToCart({
  product,
}: AddToCartProps) {
  const addItem = useCartStore(
    (state) => state.addItem
  );

  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="mt-8">
        <h3 className="mb-3 font-semibold">
          Quantity
        </h3>

        <QuantitySelector
          max={product.stock}
          value={quantity}
          onChange={setQuantity}
        />
      </div>

      <Button
        className="mt-8 w-full md:w-auto"
        size="lg"
        onClick={() => {
          addItem(product, quantity);

          toast.success("Added to cart");
        }}
      >
        Add to Cart
      </Button>
    </>
  );
}