import { CategoryDashboard } from "@/components/admin/category/category-dashboard";

import { connectDB } from "@/lib/mongodb";
import { getCategories } from "@/lib/services/category.service";

export default async function AdminCategoriesPage() {
  await connectDB();

  const categories =
    await getCategories();

  return (
    <div className="p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Categories
      </h1>

      <CategoryDashboard
        categories={categories.map(
          (category: any) => ({
            ...category,
            _id:
              category._id.toString(),
          })
        )}
      />
    </div>
  );
}