import { ProductDashboard } from "@/components/admin/product/product-dashboard";
import { ProductForm } from "@/components/admin/product/product-form";
import { ProductList } from "@/components/admin/product/product-list";

import { connectDB } from "@/lib/mongodb";
import { getProducts } from "@/lib/services/product.service";

export default async function AdminProductsPage() {
  await connectDB();

  const products = await getProducts();

  return (
  <ProductDashboard
    products={products}
  />
);
}