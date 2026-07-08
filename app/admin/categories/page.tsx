// import { CategoryDashboard } from "@/components/admin/category/category-dashboard";

// import { connectDB } from "@/lib/mongodb";
// import { getCategories } from "@/lib/services/category.service";

// export default async function AdminCategoriesPage() {
//   await connectDB();

//   const categories = await getCategories();

//   return (
//     <CategoryDashboard
//       categories={categories.map((category) => ({
//         ...category,
//         _id: category._id.toString(),
//       }))}
//     />
//   );
// }