import Container from "@/components/ui/container";

import { CategoryCarousel } from "./category-carousel";

import { connectDB } from "@/lib/mongodb";
import { getCategories } from "@/lib/services/category.service";

export async function Categories() {
  await connectDB();

  const categories =
    await getCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <Container>
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent-hover)]">
            Categories
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Shop by Category
          </h2>

          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Discover collections crafted for every occasion.
          </p>
        </div>

        <CategoryCarousel
          categories={categories}
        />
      </Container>
    </section>
  );
}