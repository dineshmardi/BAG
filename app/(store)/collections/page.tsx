import Link from "next/link";
import Image from "next/image";

import Container from "@/components/ui/container";

import { connectDB } from "@/lib/mongodb";
import { getCategories } from "@/lib/services/category.service";
import { getCategoryImage } from "@/components/categories/category-images";

export default async function CollectionsPage() {
  await connectDB();

  const categories = await getCategories();

  return (
    <section className="min-h-screen bg-[#faf9f6] py-16">
      <Container>
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--accent-hover)]">
            Collections
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Shop Our Collections
          </h1>

          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Explore our curated collections and find the perfect style for every occasion.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No collections available
            </h2>

            <p className="mt-2 text-muted-foreground">
              New collections will be available soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category._id.toString()}
                href={`/shop?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <Image
                    src={getCategoryImage(
                      category.slug
                    )}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 text-center">
                  <h2 className="text-lg font-semibold">
                    {category.name}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Explore Collection
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}