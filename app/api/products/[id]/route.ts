import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import {
    updateProduct,
    deleteProduct,
} from "@/lib/services/product.service";
import { productSchema } from "@/lib/validations/product";

type RouteParams = {
    params: Promise<{
        id: string;
    }>;
};

export async function PUT(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await connectDB();

        const { id } = await params;

        const body = await request.json();

        const validatedData = productSchema.parse(body);

        const product = await updateProduct(id, validatedData);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update product" },
            { status: 400 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await connectDB();

        const { id } = await params;

        const product = await deleteProduct(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to delete product" },
            { status: 400 }
        );
    }
}