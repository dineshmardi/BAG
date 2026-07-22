import { Suspense } from "react";

import Container from "@/components/ui/Container";

import { ProductFilters } from "./product-filters";
import { ProductCard } from "./product-card";

import { connectDB } from "@/lib/mongodb";
import { getProducts } from "@/lib/services/product.service";
import { getCategories } from "@/lib/services/category.service";

type FeaturedProductsProps = {
  search?: string;
  category?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  onSale?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export async function FeaturedProducts({
  search = "",
  category = "",
  sort = "newest",
  minPrice = "",
  maxPrice = "",
  onSale,
  eyebrow = "Featured",
  title = "Best Selling Products",
  description = "Discover our most loved premium handbags.",
}: FeaturedProductsProps) {
  await connectDB();

  const [products, categories] =
    await Promise.all([
      getProducts({
        search,
        category,
        sort,
        minPrice,
        maxPrice,
        onSale,
      }),
      getCategories(),
    ]);

  return (
    <section className="bg-[#faf9f6] py-16">
      <Container>
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent-hover)]">
            {eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            {title}
          </h2>

          <p className="mt-3 text-base leading-7 text-muted-foreground">
            {description}
          </p>
        </div>

        <Suspense fallback={null}>
          <ProductFilters
            categories={categories.map(
              (category) => ({
                _id: category._id,
                name: category.name,
              })
            )}
          />
        </Suspense>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold">
              No products found
            </h3>

            <p className="mt-2 text-muted-foreground">
              Try different filters.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                image={product.images[0]}
                price={product.price}
                salePrice={product.salePrice}
                onSale={product.onSale}
                rating={product.rating}
                reviews={product.reviews}
                badge={
                  product.featured
                    ? "Featured"
                    : "New"
                }
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}