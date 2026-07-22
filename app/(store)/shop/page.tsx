import { FeaturedProducts } from "@/components/products/featured-products";

type ShopPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const {
    search = "",
    category = "",
    sort = "newest",
    minPrice = "",
    maxPrice = "",
  } = await searchParams;

  return (
    <FeaturedProducts
      search={search}
      category={category}
      sort={sort}
      minPrice={minPrice}
      maxPrice={maxPrice}
    />
  );
}