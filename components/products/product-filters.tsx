"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

  const searchParams =
    useSearchParams();

  const category =
    searchParams.get("category") ??
    "All";

  const sort =
    searchParams.get("sort") ??
    "newest";

  function updateFilters(
    newCategory: string,
    newSort: string
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

    router.push(
      `/?${params.toString()}`
    );
  }

  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 rounded-xl border bg-white p-5 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            updateFilters(
              e.target.value,
              sort
            )
          }
          className="rounded-lg border px-4 py-2"
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

      <div>
        <label className="mb-2 block text-sm font-medium">
          Sort By
        </label>

        <select
          value={sort}
          onChange={(e) =>
            updateFilters(
              category,
              e.target.value
            )
          }
          className="rounded-lg border px-4 py-2"
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
    </div>
  );
}