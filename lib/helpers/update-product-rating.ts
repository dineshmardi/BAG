import mongoose from "mongoose";
import Product from "@/models/Product";
import Review from "@/models/Review";

export async function updateProductRating(
    productId: string
) {
    const result =
        await Review.aggregate([
            {
                $match: {
                    productId:
                        new mongoose.Types.ObjectId(productId),
                },
            },
            {
                $group: {
                    _id: "$productId",
                    averageRating: {
                        $avg: "$rating",
                    },
                    totalReviews: {
                        $sum: 1,
                    },
                },
            },
        ]);

    const averageRating =
        result.length > 0
            ? Number(
                result[0].averageRating.toFixed(
                    1
                )
            )
            : 0;

    const totalReviews =
        result.length > 0
            ? result[0].totalReviews
            : 0;

    await Product.findByIdAndUpdate(
        productId,
        {
            rating: averageRating,
            reviews: totalReviews,
        }
    );
}