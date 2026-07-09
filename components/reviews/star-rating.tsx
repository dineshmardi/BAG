"use client";

import { Star } from "lucide-react";

type StarRatingProps = {
  value: number;
  onChange?: (
    rating: number
  ) => void;
  size?: number;
  readOnly?: boolean;
};

export function StarRating({
  value,
  onChange,
  size = 22,
  readOnly = false,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(
        (star) => (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() =>
              onChange?.(star)
            }
            className={
              readOnly
                ? "cursor-default"
                : "cursor-pointer"
            }
          >
            <Star
              size={size}
              className={
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        )
      )}
    </div>
  );
}