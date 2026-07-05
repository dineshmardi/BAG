import { connectDB } from "@/lib/mongodb";
import { getCategories } from "@/lib/services/category.service";

export default async function AdminCategoriesPage() {
  await connectDB();

  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-12">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">
          Category Management
        </h1>

        <p className="text-muted-foreground">
          Categories: {categories.length}
        </p>
      </div>
    </main>
  );
}