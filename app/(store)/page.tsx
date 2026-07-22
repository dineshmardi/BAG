import { Hero } from "@/components/hero/hero";
import { Categories } from "@/components/categories/categories";
import { FeaturedProducts } from "@/components/products/featured-products";

type HomeProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
  const {
    search = "",
    category = "",
    sort = "newest",
    minPrice = "",
    maxPrice = "",
  } = await searchParams;

  return (
    <>
      <Hero />

      <Categories />

      <FeaturedProducts
        search={search}
        category={category}
        sort={sort}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </>
  );
}