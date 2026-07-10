"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
    _id: string;
    name: string;
};

type CategorySelectProps = {
    value: string;
    onChange: (value: string) => void;
};

export function CategorySelect({
    value,
    onChange,
}: CategorySelectProps) {
    const [categories, setCategories] =
        useState<Category[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function loadCategories() {
            try {
                const response =
                    await axios.get(
                        "/api/categories"
                    );

                setCategories(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    return (
        <select
            value={value}
            disabled={loading}
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
            <option value="">
                {loading
                    ? "Loading categories..."
                    : "Select category"}
            </option>

            {categories.map((category) => (
                <option
                    key={category._id}
                    value={category.name}
                >
                    {category.name}
                </option>
            ))}
        </select>
    );
}