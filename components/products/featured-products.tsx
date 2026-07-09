import { ProductGrid } from "./product-grid";
import { ProductCard } from "./product-card";
import { connectDB } from "@/lib/mongodb";
import { getProducts } from "@/lib/services/product.service";

export async function FeaturedProducts() {
  await connectDB();

  const products = await getProducts();
  return (
    <section className="py-24 bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-hover)]">
            Featured
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Best Selling Products
          </h2>

          <p className="mt-4 text-muted-foreground">
            Discover our most loved premium handbags.
          </p>
        </div>

        <ProductGrid
          products={products}
        />

      </div>
    </section>
  );
}