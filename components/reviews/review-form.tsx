"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";

type ReviewFormProps = {
  productId: string;
  onSuccess?: () => void;
};

export function ReviewForm({
  productId,
  onSuccess,
}: ReviewFormProps) {
  const { data: session } =
    useSession();

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!session) {
      toast.error(
        "Please login to write a review."
      );

      return;
    }

    if (!comment.trim()) {
      toast.error(
        "Please enter your review."
      );

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "/api/reviews",
        {
          productId,
          rating,
          comment,
        }
      );

      toast.success(
        "Review submitted successfully."
      );

      setRating(5);
      setComment("");

      onSuccess?.();
    } catch (error: any) {
      if (
        error.response?.status === 409
      ) {
        toast.error(
          "You have already reviewed this product."
        );
      } else {
        toast.error(
          "Failed to submit review."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-2xl font-semibold">
        Write a Review
      </h2>

      <div className="mb-5">
        <label className="mb-2 block font-medium">
          Rating
        </label>

        <StarRating
          value={rating}
          onChange={setRating}
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium">
          Review
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-black"
          placeholder="Share your experience with this product..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Review"}
      </Button>
    </form>
  );
}