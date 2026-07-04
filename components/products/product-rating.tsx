import { Star } from "lucide-react";

type ProductRatingProps = {
  rating: number;
  reviews: number;
};

export function ProductRating({
  rating,
  reviews,
}: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

      <span className="text-sm font-medium">
        {rating}
      </span>

      <span className="text-sm text-muted-foreground">
        ({reviews})
      </span>
    </div>
  );
}