import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import {
  getWishlistByUser,
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} from "@/lib/services/wishlist.service";

export async function GET() {
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

    const wishlist =
      await getWishlistByUser(
        session.user.id
      );

    return NextResponse.json(
      wishlist
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to fetch wishlist.",
      },
      {
        status: 500,
      }
    );
  }
}

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

    const { productId } =
      await request.json();

    const exists =
      await isWishlisted(
        session.user.id,
        productId
      );

    if (exists) {
      return NextResponse.json(
        {
          message:
            "Already in wishlist.",
        },
        {
          status: 409,
        }
      );
    }

    const wishlist =
      await addToWishlist(
        session.user.id,
        productId
      );

    return NextResponse.json(
      wishlist,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to add to wishlist.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
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

    const { productId } =
      await request.json();

    await removeFromWishlist(
      session.user.id,
      productId
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to remove wishlist item.",
      },
      {
        status: 500,
      }
    );
  }
}