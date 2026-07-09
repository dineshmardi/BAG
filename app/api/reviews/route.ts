import { updateProductRating } from "@/lib/helpers/update-product-rating";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import {
    createReview,
    getAverageRating,
    getReviewByUser,
    getReviewsByProductId,
} from "@/lib/services/review.service";

export async function POST(
    request: Request
) {
    try {
        await connectDB();

        const session =
            await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const {
            productId,
            rating,
            comment,
        } = await request.json();

        if (!productId) {
            return NextResponse.json(
                {
                    message:
                        "Product is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            rating < 1 ||
            rating > 5
        ) {
            return NextResponse.json(
                {
                    message:
                        "Rating must be between 1 and 5.",
                },
                {
                    status: 400,
                }
            );
        }

        if (
            !comment ||
            comment.trim() === ""
        ) {
            return NextResponse.json(
                {
                    message:
                        "Comment is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const existingReview =
            await getReviewByUser(
                session.user.id,
                productId
            );

        if (existingReview) {
            return NextResponse.json(
                {
                    message:
                        "You have already reviewed this product.",
                },
                {
                    status: 409,
                }
            );
        }

        const review =
            await createReview({
                userId: session.user.id,
                productId,
                rating,
                comment,
            });
        await updateProductRating(
            productId
        );
        return NextResponse.json(
            review,
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to create review.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET(
    request: Request
) {
    try {
        await connectDB();

        const { searchParams } =
            new URL(request.url);

        const productId =
            searchParams.get(
                "productId"
            );

        if (!productId) {
            return NextResponse.json(
                {
                    message:
                        "Product ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const reviews =
            await getReviewsByProductId(
                productId
            );

        const stats =
            await getAverageRating(
                productId
            );

        return NextResponse.json({
            reviews,
            averageRating:
                stats.averageRating ?? 0,
            totalReviews:
                stats.totalReviews ?? 0,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to fetch reviews.",
            },
            {
                status: 500,
            }
        );
    }
}