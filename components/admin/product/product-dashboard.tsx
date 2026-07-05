"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Product } from "@/types/product";

import { ProductForm } from "./product-form";
import { ProductList } from "./product-list";

type ProductDashboardProps = {
    products: Product[];
};

export function ProductDashboard({
    products,
}: ProductDashboardProps) {

    const router = useRouter();
    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);
    async function handleDelete(product: Product) {
        try {
            const response = await fetch(`/api/products/${product._id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            toast.success("Product deleted successfully!");

            if (selectedProduct?._id === product._id) {
                setSelectedProduct(null);
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete product.");
        }
    }

    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <h1 className="mb-8 text-4xl font-bold">
                Product Management
            </h1>

            <div className="grid gap-8 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-semibold">
                            {selectedProduct ? "Edit Product" : "Add Product"}
                        </h2>

                        <ProductForm
                            product={selectedProduct}
                            onCancel={() => setSelectedProduct(null)}
                        />
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-2xl font-semibold">
                            Products
                        </h2>

                        <ProductList
                            products={products}
                            onEdit={setSelectedProduct}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}