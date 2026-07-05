import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import {
  createCategory,
  getCategories,
} from "@/lib/services/category.service";
import { categorySchema } from "@/lib/validations/category";

export async function GET() {
  try {
    await connectDB();

    const categories = await getCategories();

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const data = categorySchema.parse(body);

    const category = await createCategory(data);

    return NextResponse.json(category, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 400 }
    );
  }
}