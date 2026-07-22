import Link from "next/link";
import Image from "next/image";

import { getCategoryImage } from "./category-images";

type CategoryItemProps = {
  name: string;
  slug: string;
};

export function CategoryItem({
  name,
  slug,
}: CategoryItemProps) {
  return (
    <Link
      href={`/?category=${encodeURIComponent(name)}`}
      className="group flex flex-col items-center"
    >
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-stone-50 p-2 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
        <Image
          src={getCategoryImage(slug)}
          alt={name}
          width={96}
          height={96}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <span className="mt-2 max-w-24 text-center text-sm font-medium">
        {name}
      </span>
    </Link>
  );
}