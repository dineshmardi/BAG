import { CategoryDashboard } from "@/components/admin/category/category-dashboard";

import { connectDB } from "@/lib/mongodb";
import { getCategories } from "@/lib/services/category.service";

export default async function AdminCategoriesPage() {
  await connectDB();

  const categories =
    await getCategories();

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your product categories.
        </p>
      </div>

      <div className="w-full">
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
    </div>
  );
}