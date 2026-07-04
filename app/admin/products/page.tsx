import { ProductForm } from "@/components/admin/product-form";

export default function AdminProductsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Product Management
      </h1>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <ProductForm />
      </div>
    </main>
  );
}