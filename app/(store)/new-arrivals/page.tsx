import { FeaturedProducts } from "@/components/products/featured-products";

type NewArrivalsPageProps = {
    searchParams: Promise<{
        search?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
};

export default async function NewArrivalsPage({
    searchParams,
}: NewArrivalsPageProps) {
    const {
        search = "",
        category = "",
        minPrice = "",
        maxPrice = "",
    } = await searchParams;

    return (
        <FeaturedProducts
            search={search}
            category={category}
            sort="newest"
            minPrice={minPrice}
            maxPrice={maxPrice}
            eyebrow="Just In"
            title="New Arrivals"
            description="Discover the latest additions to our collection."
        />
    );
}