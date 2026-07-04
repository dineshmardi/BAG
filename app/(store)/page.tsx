import { Hero } from "@/components/hero/hero";
import { Categories } from "@/components/categories/categories";
import { FeaturedProducts } from "@/components/products/featured-products";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </>
  );
}