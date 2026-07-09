import { Schema, model, models } from "mongoose";

const WishlistSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate wishlist entries
WishlistSchema.index(
  {
    userId: 1,
    productId: 1,
  },
  {
    unique: true,
  }
);

const Wishlist =
  models.Wishlist ||
  model("Wishlist", WishlistSchema);

export default Wishlist;