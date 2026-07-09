"use client";
import { ReviewList } from "./review-list";
import { useEffect, useState } from "react";
import axios from "axios";

import { StarRating } from "./star-rating";
import { ReviewForm } from "./review-form";

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

type ReviewsSectionProps = {
    productId: string;
};

export function ReviewsSection({
    productId,
}: ReviewsSectionProps) {
    const [reviews, setReviews] =
        useState<Review[]>([]);

    const [averageRating, setAverageRating] =
        useState(0);

    const [totalReviews, setTotalReviews] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    async function fetchReviews() {
        try {
            const response =
                await axios.get(
                    `/api/reviews?productId=${productId}`
                );

            setReviews(response.data.reviews);

            setAverageRating(
                response.data.averageRating
            );

            setTotalReviews(
                response.data.totalReviews
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    if (loading) {
        return (
            <div className="mt-16">
                Loading reviews...
            </div>
        );
    }

    return (
        <section className="mt-20 border-t pt-12">
            <div className="mb-10">
                <h2 className="text-3xl font-bold">
                    Customer Reviews
                </h2>

                <div className="mt-4 flex items-center gap-4">
                    <StarRating
                        value={Math.round(
                            averageRating
                        )}
                        readOnly
                    />

                    <span className="text-lg font-medium">
                        {averageRating.toFixed(1)}
                    </span>

                    <span className="text-gray-500">
                        ({totalReviews} Reviews)
                    </span>
                </div>
            </div>

            <ReviewForm
                productId={productId}
                onSuccess={fetchReviews}
            />

            <ReviewList reviews={reviews} />
        </section>
    );
}