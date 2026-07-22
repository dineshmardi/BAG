export const categoryImages: Record<string, string> = {
  "carry-bag": "/images/categories/carry.jpg",
  "handbag": "/images/categories/handbags.jpg",
  "office-bag": "/images/categories/clutches.jpg",
  "stylish-bag": "/images/categories/backpacks.jpg",
  "totes": "/images/categories/totes.jpg",
};

export function getCategoryImage(
  slug: string
) {
  return (
    categoryImages[slug] ??
    "/images/categories/handbags.jpg"
  );
}