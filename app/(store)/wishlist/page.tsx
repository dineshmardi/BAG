import { WishlistGrid } from "@/components/wishlist/wishlist-grid";

export default function WishlistPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        My Wishlist
      </h1>

      <WishlistGrid />
    </main>
  );
}