"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CategoryForm } from "./category-form";

type Category = {
    _id: string;
    name: string;
    slug: string;

};

type CategoryTableProps = {
    categories: Category[];
};

export function CategoryTable({
    categories,
}: CategoryTableProps) {
    const [editing, setEditing] =
        useState<Category | null>(null);

    async function handleDelete(
        id: string
    ) {
        if (
            !confirm(
                "Delete this category?"
            )
        ) {
            return;
        }

        try {
            const response = await fetch(
                `/api/categories/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            toast.success(
                "Category deleted."
            );

            window.location.reload();
        } catch {
            toast.error(
                "Failed to delete category."
            );
        }
    }

    if (editing) {
        return (
            <div className="rounded-xl border p-6">
                <h2 className="mb-6 text-xl font-semibold">
                    Edit Category
                </h2>

                <CategoryForm
                    category={editing}
                    onCancel={() =>
                        setEditing(null)
                    }
                />
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[600px]">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left">
                            Name
                        </th>

                        <th className="px-4 py-3 text-left">
                            Slug
                        </th>

                        <th className="px-4 py-3 text-right">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map(
                        (category) => (
                            <tr
                                key={category._id}
                                className="border-t"
                            >
                                <td className="px-4 py-3">
                                    {category.name}
                                </td>

                                <td className="px-4 py-3">
                                    {category.slug}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() =>
                                                setEditing(
                                                    category
                                                )
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(
                                                    category._id
                                                )
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    )}

                    {categories.length ===
                        0 && (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="py-10 text-center text-gray-500"
                                >
                                    No categories found.
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}