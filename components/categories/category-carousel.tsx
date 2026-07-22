"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { CategoryItem } from "./category-item";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
};

export function CategoryCarousel({
  categories,
}: Props) {
  // Repeat categories only for carousel display.
  // Nothing is duplicated in MongoDB.
  const carouselCategories = [
    ...categories,
    ...categories,
    ...categories,
  ];

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <div
      ref={emblaRef}
      className="overflow-hidden py-4"
    >
      <div className="flex">
        {carouselCategories.map(
          (category, index) => (
            <div
              key={`${category._id}-${index}`}
              className="min-w-0 flex-[0_0_130px] px-3"
            >
              <CategoryItem
                name={category.name}
                slug={category.slug}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}