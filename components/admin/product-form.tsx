"use client";

import { TextInput } from "@/components/forms/text-input";
import { TextArea } from "@/components/forms/text-area";
import { NumberInput } from "@/components/forms/number-input";
import { SubmitButton } from "@/components/forms/submit-button";

export function ProductForm() {
  return (
    <form className="space-y-6">

      <TextInput
        label="Product Title"
        name="title"
        placeholder="Luxury Leather Tote"
      />

      <TextArea
        label="Description"
        name="description"
        placeholder="Write product description..."
      />

      <NumberInput
        label="Price"
        name="price"
        placeholder="4999"
      />

      <TextInput
        label="Category"
        name="category"
        placeholder="Handbags"
      />

      <NumberInput
        label="Stock"
        name="stock"
        placeholder="25"
      />

      <TextInput
        label="Image URL"
        name="image"
        placeholder="/images/products/bag1.jpg"
      />

      <SubmitButton>
        Save Product
      </SubmitButton>

    </form>
  );
}