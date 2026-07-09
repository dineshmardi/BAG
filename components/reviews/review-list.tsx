"use client";

import { StarRating } from "./star-rating";

type Review = {
  _id: string;

  userId: {
    _id: string;
    name: string;
  };

  rating: number;

  comment: string;

  createdAt: string;
};

type ReviewListProps = {
  reviews: Review[];
};

export function ReviewList({
  reviews,
}: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="mt-10 rounded-xl border p-8 text-center">
        <h3 className="text-xl font-semibold">
          No reviews yet
        </h3>

        <p className="mt-2 text-gray-500">
          Be the first to review this product.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <StarRating
              value={review.rating}
              readOnly
            />

            <span className="text-sm text-gray-500">
              {new Date(
                review.createdAt
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <p className="mt-4 leading-7">
            {review.comment}
          </p>

          <p className="mt-5 font-semibold">
            — {review.userId.name}
          </p>
        </div>
      ))}
    </div>
  );
}