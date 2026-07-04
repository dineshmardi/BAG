import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { createProduct, getProducts } from "@/lib/services/product.service";

export async function GET() {
  try {
    await connectDB();

    const products = await getProducts();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const product = await createProduct(body);

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}