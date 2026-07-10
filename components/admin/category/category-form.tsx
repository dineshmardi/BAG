"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  categorySchema,
  type CategoryFormValues,
} from "@/lib/validations/category";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type CategoryFormProps = {
  category?: Category | null;
  onCancel?: () => void;
};

export function CategoryForm({
  category,
  onCancel,
}: CategoryFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: category?.name ?? "",
    },
  });

  async function onSubmit(
    data: CategoryFormValues
  ) {
    try {
      const response = await fetch(
        category
          ? `/api/categories/${category._id}`
          : "/api/categories",
        {
          method: category
            ? "PUT"
            : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        category
          ? "Category updated successfully!"
          : "Category created successfully!"
      );

      reset({
        name: "",
      });

      router.refresh();

      onCancel?.();
    } catch (error) {
      console.error(error);

      toast.error(
        category
          ? "Failed to update category."
          : "Failed to create category."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <Label htmlFor="name">
          Category Name
        </Label>

        <Input
          id="name"
          {...register("name")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.name?.message}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? category
              ? "Updating..."
              : "Creating..."
            : category
              ? "Update Category"
              : "Create Category"}
        </Button>

        {category && (
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