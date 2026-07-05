import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { createProduct, getProducts } from "@/lib/services/product.service";
import { productSchema } from "@/lib/validations/product";

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

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validatedData = productSchema.parse(body);

    const product = await createProduct(validatedData);

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 400 }
    );
  }
}