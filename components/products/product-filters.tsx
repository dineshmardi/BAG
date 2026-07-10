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

  function changeCategory(
    value: string
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (value === "All") {
      params.delete("category");
    } else {
      params.set(
        "category",
        value
      );
    }

    router.push(
      `/?${params.toString()}`
    );
  }

  return (
    <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white p-5 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            changeCategory(
              e.target.value
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
    </div>
  );
}