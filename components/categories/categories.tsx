import { CategoryCard } from "./category-card";
import { categories } from "./category-data";

export function Categories() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-hover)]">
            Categories
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Shop by Category
          </h2>

          <p className="mt-4 text-muted-foreground">
            Discover collections crafted for every occasion.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}