"use client";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  productSchema,
  ProductFormValues,
} from "@/lib/validations/product";

import type { Product } from "@/types/product";

type ProductFormProps = {
  product?: Product | null;
  onCancel?: () => void;
};

export function ProductForm({
  product,
  onCancel,
}: ProductFormProps) {

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      category: product?.category ?? "",
      stock: product?.stock ?? 0,
      image: product?.images?.[0] ?? "",
    },
  });
  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: product.images[0] ?? "",
      });
    } else {
      reset({
        title: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        image: "",
      });
    }
  }, [product, reset]);

  async function onSubmit(data: ProductFormValues) {
    try {
      const response = await fetchWithTimeout(
        product
          ? `/api/products/${product._id}`
          : "/api/products",
        {
          method: product ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(
          product
            ? "Failed to update product"
            : "Failed to save product"
        );
      }

      reset();

      onCancel?.();

      router.refresh(); // <-- Notice the ()

      toast.success(
        product
          ? "Product updated successfully!"
          : "Product created successfully!"
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        toast.error("Request timed out. Please try again.");
        return;
      }

      console.error(error);

      toast.error(
        product
          ? "Failed to update product."
          : "Failed to save product."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <Label htmlFor="title">Product Title</Label>

        <Input
          id="title"
          {...register("title")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.title?.message}
        </p>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          {...register("description")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.description?.message}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>

          <Input
            id="price"
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.price?.message}
          </p>
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>

          <Input
            id="stock"
            type="number"
            {...register("stock", {
              valueAsNumber: true,
            })}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.stock?.message}
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>

        <Input
          id="category"
          {...register("category")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.category?.message}
        </p>
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>

        <Input
          id="image"
          {...register("image")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.image?.message}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? product
              ? "Updating..."
              : "Saving..."
            : product
              ? "Update Product"
              : "Save Product"}
        </Button>

        {product && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}