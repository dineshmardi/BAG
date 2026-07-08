// "use client";

// import { useState } from "react";

// import { CategoryForm } from "./category-form";
// import { CategoryList } from "./category-list";

// export type Category = {
//   _id: string;
//   name: string;
//   slug: string;
// };

// type CategoryDashboardProps = {
//   categories: Category[];
// };

// export function CategoryDashboard({
//   categories,
// }: CategoryDashboardProps) {
//   const [selectedCategory, setSelectedCategory] =
//     useState<Category | null>(null);

//   return (
//     <main className="mx-auto max-w-5xl space-y-8 px-6 py-12">
//       <div className="rounded-2xl border bg-white p-8 shadow-sm">
//         <h1 className="mb-6 text-3xl font-bold">
//           {selectedCategory
//             ? "Edit Category"
//             : "Add Category"}
//         </h1>

//         <CategoryForm
//           category={selectedCategory}
//           onCancel={() => setSelectedCategory(null)}
//         />
//       </div>

//       <div className="rounded-2xl border bg-white p-8 shadow-sm">
//         <h2 className="mb-6 text-2xl font-bold">
//           Categories
//         </h2>

//         <CategoryList
//           categories={categories}
//           onEdit={setSelectedCategory}
//         />
//       </div>
//     </main>
//   );
// }