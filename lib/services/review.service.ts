import Review from "@/models/Review";

export async function createReview(
  data: Record<string, unknown>
) {
  return Review.create(data);
}

export async function getReviewsByProductId(
  productId: string
) {
  return Review.find({
    productId,
  })
    .populate("userId", "name")
    .sort({
      createdAt: -1,
    });
}

export async function getReviewByUser(
  userId: string,
  productId: string
) {
  return Review.findOne({
    userId,
    productId,
  });
}

export async function updateReview(
  id: string,
  data: Record<string, unknown>
) {
  return Review.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
}

export async function deleteReview(
  id: string
) {
  return Review.findByIdAndDelete(id);
}

export async function getAverageRating(
  productId: string
) {
  const result =
    await Review.aggregate([
      {
        $match: {
          productId,
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

  if (result.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
    };
  }

  return result[0];
}