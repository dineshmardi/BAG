import Category from "@/models/Category";
import type { CategoryFormValues } from "@/lib/validations/category";

export async function getCategories() {
  return Category.find()
    .sort({ name: 1 })
    .lean();
}

export async function createCategory(
  data: CategoryFormValues
) {
  return Category.create(data);
}

export async function updateCategory(
  id: string,
  data: CategoryFormValues
) {
  return Category.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function deleteCategory(
  id: string
) {
  return Category.findByIdAndDelete(id);
}