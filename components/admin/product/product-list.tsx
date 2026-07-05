import type { Product } from "@/types/product";
import { ProductActions } from "./product-actions";

type ProductListProps = {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
};

export function ProductList({
    products,
    onEdit,
    onDelete,
}: ProductListProps) {
    if (products.length === 0) {
        return (
            <div className="rounded-xl border p-8 text-center">
                <p className="text-muted-foreground">
                    No products found.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border">
            <table className="w-full">
                <thead className="bg-muted">
                    <tr>
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left">Category</th>
                        <th className="px-4 py-3 text-left">Price</th>
                        <th className="px-4 py-3 text-left">Stock</th>
                        <th className="px-4 py-3 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product._id}
                            className="border-t"
                        >
                            <td className="px-4 py-3">
                                {product.title}
                            </td>

                            <td className="px-4 py-3">
                                {product.category}
                            </td>

                            <td className="px-4 py-3">
                                ₹{product.price}
                            </td>

                            <td className="px-4 py-3">
                                {product.stock}
                            </td>

                            <td className="px-4 py-3">
                                <ProductActions
                                    onEdit={() => onEdit(product)}
                                    onDelete={() => onDelete(product)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}