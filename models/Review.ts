import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// One review per user per product
ReviewSchema.index(
  {
    userId: 1,
    productId: 1,
  },
  {
    unique: true,
  }
);

const Review =
  models.Review ||
  model("Review", ReviewSchema);

export default Review;