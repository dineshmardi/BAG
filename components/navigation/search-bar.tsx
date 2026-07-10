"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SearchBar() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const [search, setSearch] =
    useState(
      searchParams.get("search") ?? ""
    );

  function handleSearch() {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (search.trim()) {
      params.set(
        "search",
        search.trim()
      );
    } else {
      params.delete("search");
    }

    router.push(
      `/?${params.toString()}`
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="w-64 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-black"
      />

      <Button
        size="icon"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}