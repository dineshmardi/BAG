import Wishlist from "@/models/Wishlist";

export async function getWishlistByUser(
  userId: string
) {
  return Wishlist.find({
    userId,
  }).populate("productId");
}

export async function isWishlisted(
  userId: string,
  productId: string
) {
  return Wishlist.exists({
    userId,
    productId,
  });
}

export async function addToWishlist(
  userId: string,
  productId: string
) {
  return Wishlist.create({
    userId,
    productId,
  });
}

export async function removeFromWishlist(
  userId: string,
  productId: string
) {
  return Wishlist.findOneAndDelete({
    userId,
    productId,
  });
}