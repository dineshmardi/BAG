import { getCategories } from "@/lib/services/category.service";
import { ProductFilters } from "./product-filters";
import { ProductCard } from "./product-card";
import { Suspense } from "react";
import { connectDB } from "@/lib/mongodb";
import { getProducts } from "@/lib/services/product.service";

type FeaturedProductsProps = {
  search?: string;
  category?: string;
};

export async function FeaturedProducts({
  search = "",
  category = "",
}: FeaturedProductsProps) {
  await connectDB();

  const products =
    await getProducts({
      search,
      category,
    });
  const categories =
    await getCategories();

  return (
    <section className="bg-[#faf9f6] py-24">
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
        <Suspense fallback={null}>
          <ProductFilters
            categories={categories.map((category: any) => ({
              _id: category._id.toString(),
              name: category.name,
            }))}
          />
        </Suspense>
        {products.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold">
              No products found
            </h3>

            <p className="mt-2 text-muted-foreground">
              Try a different search.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {products.map(
              (product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  title={product.title}
                  image={
                    product.images[0]
                  }
                  price={
                    product.price
                  }
                  rating={
                    product.rating
                  }
                  reviews={
                    product.reviews
                  }
                  badge={
                    product.featured
                      ? "Featured"
                      : "New"
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}