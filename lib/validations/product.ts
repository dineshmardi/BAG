import { z } from "zod";

export const productSchema = z
  .object({
    title: z
      .string()
      .min(
        3,
        "Title must be at least 3 characters"
      ),

    description: z
      .string()
      .min(
        10,
        "Description is too short"
      ),

    price: z
      .number({
        error: "Price is required",
      })
      .min(
        1,
        "Price must be greater than 0"
      ),

    salePrice: z
      .number()
      .min(
        0,
        "Sale price cannot be negative"
      )
      .optional(),

    onSale: z.boolean(),

    category: z
      .string()
      .min(
        2,
        "Category is required"
      ),

    stock: z
      .number({
        error: "Stock is required",
      })
      .min(0),

    image: z
      .string()
      .min(
        1,
        "Image URL is required"
      ),
  })
  .refine(
    (data) => {
      if (!data.onSale) {
        return true;
      }

      return (
        data.salePrice !== undefined &&
        data.salePrice > 0 &&
        data.salePrice < data.price
      );
    },
    {
      message:
        "Sale price must be greater than 0 and less than the regular price",
      path: ["salePrice"],
    }
  );

export type ProductFormValues =
  z.infer<typeof productSchema>;