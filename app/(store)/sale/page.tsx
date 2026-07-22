import { FeaturedProducts } from "@/components/products/featured-products";

type SalePageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export default async function SalePage({
  searchParams,
}: SalePageProps) {
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
      onSale={true}
      eyebrow="Special Offers"
      title="Sale"
      description="Discover exclusive offers on selected products."
    />
  );
}