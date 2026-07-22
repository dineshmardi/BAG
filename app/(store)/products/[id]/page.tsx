import { ReviewsSection } from "@/components/reviews/reviews-section";
import { AddToCart } from "@/components/products/add-to-cart";
import Image from "next/image";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import { getProductById } from "@/lib/services/product.service";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  await connectDB();

  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          {product.onSale &&
            product.salePrice !== undefined &&
            product.salePrice > 0 &&
            product.salePrice < product.price ? (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-semibold">
                ₹{product.salePrice.toLocaleString("en-IN")}
              </span>

              <span className="text-xl text-muted-foreground line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                Sale
              </span>
            </div>
          ) : (
            <p className="mt-4 text-3xl font-semibold">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          )}

          <p className="mt-6 text-muted-foreground leading-7">
            {product.description}
          </p>

          <p className="mt-6 font-medium">
            {product.stock > 0
              ? "✅ In Stock"
              : "❌ Out of Stock"}
          </p>

          <AddToCart product={product} />
        </div>
      </div>
      <ReviewsSection
        productId={product._id.toString()}
      />
    </main>
  );
}