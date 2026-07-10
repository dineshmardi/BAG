"use client";

import { CategoryForm } from "./category-form";
import { CategoryTable } from "./category-table";

type Category = {
    _id: string;
    name: string;
    slug: string;
};

type CategoryDashboardProps = {
    categories: Category[];
};

export function CategoryDashboard({
    categories,
}: CategoryDashboardProps) {
    return (
        <div className="space-y-10">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">
                    Add Category
                </h2>

                <CategoryForm />
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">
                    Existing Categories
                </h2>

                <CategoryTable
                    categories={categories}
                />
            </div>
        </div>
    );
}