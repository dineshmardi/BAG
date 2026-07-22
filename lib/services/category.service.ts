import Category from "@/models/Category";
import type { CategoryFormValues } from "@/lib/validations/category";

export async function getCategories() {
  const categories = await Category.find()
    .sort({ name: 1 })
    .lean();

  return categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
  }));
}

export async function createCategory(
  data: CategoryFormValues
) {
  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return Category.create({
    name: data.name,
    slug,

  });
}

export async function updateCategory(
  id: string,
  data: CategoryFormValues
) {
  const slug = data.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return Category.findByIdAndUpdate(
    id,
    {
      name: data.name,
      slug,

    },
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