import Image from "next/image";
import Link from "next/link";

import {
    AlertTriangle,
    ArrowRight,
    PackageX,
} from "lucide-react";

type LowStockProduct = {
    _id: string;

    title: string;

    images: string[];

    stock: number;

    price: number;

    onSale: boolean;

    salePrice?: number | null;
};

type LowStockAlertsProps = {
    products: LowStockProduct[];

    threshold?: number;
};

export function LowStockAlerts({
    products,
    threshold = 5,
}: LowStockAlertsProps) {
    return (
        <section className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                            <AlertTriangle className="h-5 w-5 text-orange-600" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">
                                Inventory Alerts
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Products requiring stock attention.
                            </p>
                        </div>
                    </div>
                </div>

                {products.length > 0 && (
                    <span className="inline-flex min-w-[110px] items-center justify-center self-start rounded-full bg-orange-50 px-5 py-2.5 text-xs font-semibold leading-none text-orange-700 sm:self-auto">
                        {products.length}{" "}
                        {products.length === 1
                            ? "ALERT"
                            : "ALERTS"}
                    </span>
                )}
            </div>

            {/* Empty State */}
            {products.length === 0 ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                        <PackageX className="h-7 w-7 text-green-600" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                        Inventory looks good
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-gray-500">
                        There are currently no products
                        below the low-stock threshold.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-gray-100">
                    {products.map(
                        (product) => {
                            const isOutOfStock =
                                product.stock <= 0;

                            const stockPercentage =
                                Math.min(
                                    Math.max(
                                        (product.stock /
                                            threshold) *
                                        100,
                                        0
                                    ),
                                    100
                                );

                            return (
                                <div
                                    key={product._id}
                                    className="p-6 transition-colors duration-200 hover:bg-gray-50/60"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Product Image */}
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                                            {product.images[0] ? (
                                                <Image
                                                    src={
                                                        product
                                                            .images[0]
                                                    }
                                                    alt={
                                                        product.title
                                                    }
                                                    fill
                                                    sizes="64px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <PackageX className="h-5 w-5 text-gray-400" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Information */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="min-w-0">
                                                    <h3 className="truncate font-semibold text-gray-900">
                                                        {
                                                            product.title
                                                        }
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        ₹
                                                        {product.price.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </p>
                                                </div>

                                                {/* Status Badge */}
                                                <span
                                                    className={`inline-flex min-w-[110px] items-center justify-center self-start rounded-full px-4 py-2 text-xs font-semibold leading-none ${isOutOfStock
                                                            ? "bg-red-50 text-red-700"
                                                            : "bg-orange-50 text-orange-700"
                                                        }`}
                                                >
                                                    {isOutOfStock
                                                        ? "OUT OF STOCK"
                                                        : `${product.stock} LEFT`}
                                                </span>
                                            </div>

                                            {/* Stock Progress */}
                                            <div className="mt-4">
                                                <div className="mb-2 flex items-center justify-between gap-4">
                                                    <span className="text-xs font-medium text-gray-500">
                                                        Stock level
                                                    </span>

                                                    <span className="text-xs font-semibold text-gray-700">
                                                        {product.stock} /{" "}
                                                        {threshold}
                                                    </span>
                                                </div>

                                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${isOutOfStock
                                                                ? "bg-red-500"
                                                                : "bg-orange-500"
                                                            }`}
                                                        style={{
                                                            width: `${stockPercentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="mt-4 flex justify-end">
                                                <Link
                                                    href={`/admin/products/${product._id}/edit`}
                                                    className="inline-flex min-h-10 min-w-[110px] items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold leading-none transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
                                                >
                                                    Restock

                                                    <ArrowRight className="h-4 w-4 shrink-0" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-5">
                <Link
                    href="/admin/products"
                    className="
    group
    inline-flex
    min-h-12
    w-full
    items-center
    justify-center
    gap-2
    rounded-full
    border
    border-gray-200
    bg-white
    px-6
    py-3
    text-sm
    font-semibold
    leading-none
    text-gray-900
    transition-all
    duration-300
    hover:border-[#b99756]
    hover:bg-[#b99756]
    hover:text-white
    hover:shadow-md
  "
                >
                    <span className="transition-colors duration-300 group-hover:text-white">
                        Manage Inventory
                    </span>

                    <ArrowRight className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </Link>
            </div>
        </section>
    );
}