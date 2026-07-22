"use client";

import { CategorySelect } from "@/components/admin/category/category-select";
import { ImageUpload } from "./image-upload";
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
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      title: product?.title ?? "",
      description:
        product?.description ?? "",
      price: product?.price ?? 0,
      salePrice:
        product?.salePrice ?? undefined,
      onSale:
        product?.onSale ?? false,
      category:
        product?.category ?? "",
      stock:
        product?.stock ?? 0,
      image:
        product?.images?.[0] ?? "",
    },
  });

  const image = watch("image");
  const onSale = watch("onSale");

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description:
          product.description,
        price: product.price,
        salePrice:
          product.salePrice ??
          undefined,
        onSale:
          product.onSale ?? false,
        category:
          product.category,
        stock:
          product.stock,
        image:
          product.images[0] ?? "",
      });
    } else {
      reset({
        title: "",
        description: "",
        price: 0,
        salePrice: undefined,
        onSale: false,
        category: "",
        stock: 0,
        image: "",
      });
    }
  }, [product, reset]);

  async function onSubmit(
    data: ProductFormValues
  ) {


    try {
      const response =
        await fetchWithTimeout(
          product
            ? `/api/products/${product._id}`
            : "/api/products",
          {
            method: product
              ? "PUT"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              data
            ),
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

      router.refresh();

      toast.success(
        product
          ? "Product updated successfully!"
          : "Product created successfully!"
      );
    } catch (error) {
      if (
        error instanceof
        DOMException &&
        error.name ===
        "AbortError"
      ) {
        toast.error(
          "Request timed out. Please try again."
        );
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
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-6"
    >
      {/* Product Title */}
      <div>
        <Label htmlFor="title">
          Product Title
        </Label>

        <Input
          id="title"
          {...register("title")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.title?.message}
        </p>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          {...register(
            "description"
          )}
        />

        <p className="mt-1 text-sm text-red-500">
          {
            errors.description
              ?.message
          }
        </p>
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="price">
            Regular Price
          </Label>

          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            {...register(
              "price",
              {
                valueAsNumber:
                  true,
              }
            )}
          />

          <p className="mt-1 text-sm text-red-500">
            {
              errors.price
                ?.message
            }
          </p>
        </div>

        <div>
          <Label htmlFor="stock">
            Stock
          </Label>

          <Input
            id="stock"
            type="number"
            min="0"
            {...register(
              "stock",
              {
                valueAsNumber:
                  true,
              }
            )}
          />

          <p className="mt-1 text-sm text-red-500">
            {
              errors.stock
                ?.message
            }
          </p>
        </div>
      </div>

      {/* Sale Toggle */}
      <div className="rounded-lg border p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            id="onSale"
            type="checkbox"
            checked={onSale}
            onChange={(e) => {
              const checked =
                e.target.checked;

              setValue(
                "onSale",
                checked,
                {
                  shouldValidate: true,
                  shouldDirty: true,
                }
              );

              if (!checked) {
                setValue(
                  "salePrice",
                  undefined,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                );
              }
            }}
            className="h-4 w-4"
          />

          <span className="text-sm font-medium">
            Product is on sale
          </span>
        </label>

        {onSale && (
          <div className="mt-4">
            <Label htmlFor="salePrice">
              Sale Price
            </Label>

            <Input
              id="salePrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter sale price"
              {...register(
                "salePrice",
                {
                  setValueAs: (
                    value
                  ) =>
                    value === ""
                      ? undefined
                      : Number(
                        value
                      ),
                }
              )}
            />

            <p className="mt-1 text-sm text-red-500">
              {
                errors.salePrice
                  ?.message
              }
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Sale price must be lower than the regular price.
            </p>
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">
          Category
        </Label>

        <CategorySelect
          value={watch(
            "category"
          )}
          onChange={(value) =>
            setValue(
              "category",
              value,
              {
                shouldValidate:
                  true,
                shouldDirty:
                  true,
              }
            )
          }
        />

        <p className="mt-1 text-sm text-red-500">
          {
            errors.category
              ?.message
          }
        </p>
      </div>

      {/* Product Image */}
      <div>
        <Label>
          Product Image
        </Label>

        <div className="mt-2">
          <ImageUpload
            value={image}
            onChange={(url) =>
              setValue(
                "image",
                url,
                {
                  shouldValidate:
                    true,
                  shouldDirty:
                    true,
                }
              )
            }
          />
        </div>

        <p className="mt-1 text-sm text-red-500">
          {errors.image?.message}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex-1"
          disabled={
            isSubmitting
          }
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
            onClick={
              onCancel
            }
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}