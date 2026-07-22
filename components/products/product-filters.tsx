"use client";

import { useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = {
  _id: string;
  name: string;
};

type ProductFiltersProps = {
  categories: Category[];
};

export function ProductFilters({
  categories,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const category =
    searchParams.get("category") ??
    "All";

  const sort =
    searchParams.get("sort") ??
    "newest";

  const minPrice =
    searchParams.get("minPrice") ?? "";

  const maxPrice =
    searchParams.get("maxPrice") ?? "";

  const [min, setMin] =
    useState(minPrice);

  const [max, setMax] =
    useState(maxPrice);

  function updateFilters(
    newCategory: string,
    newSort: string,
    newMinPrice: string,
    newMaxPrice: string
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    // Category
    if (newCategory === "All") {
      params.delete("category");
    } else {
      params.set(
        "category",
        newCategory
      );
    }

    // Sort
    if (newSort === "newest") {
      params.delete("sort");
    } else {
      params.set(
        "sort",
        newSort
      );
    }

    // Min Price
    if (newMinPrice.trim()) {
      params.set(
        "minPrice",
        newMinPrice
      );
    } else {
      params.delete("minPrice");
    }

    // Max Price
    if (newMaxPrice.trim()) {
      params.set(
        "maxPrice",
        newMaxPrice
      );
    } else {
      params.delete("maxPrice");
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );
  }

  return (
    <div className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-4">

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              updateFilters(
                e.target.value,
                sort,
                min,
                max
              )
            }
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="All">
              All
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category._id}
                  value={category.name}
                >
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Sort By
          </label>

          <select
            value={sort}
            onChange={(e) =>
              updateFilters(
                category,
                e.target.value,
                min,
                max
              )
            }
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="newest">
              Newest
            </option>

            <option value="price-asc">
              Price: Low → High
            </option>

            <option value="price-desc">
              Price: High → Low
            </option>

            <option value="rating">
              Highest Rated
            </option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Min Price
          </label>

          <Input
            type="number"
            placeholder="0"
            value={min}
            onChange={(e) =>
              setMin(e.target.value)
            }
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Max Price
          </label>

          <Input
            type="number"
            placeholder="10000"
            value={max}
            onChange={(e) =>
              setMax(e.target.value)
            }
          />
        </div>

      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() =>
            updateFilters(
              category,
              sort,
              min,
              max
            )
          }
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}