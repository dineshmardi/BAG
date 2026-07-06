import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { registerSchema } from "@/lib/validations/auth";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const validatedData =
      registerSchema.parse(body);

    const existingUser = await User.findOne({
      email: validatedData.email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email already registered.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        validatedData.password,
        10
      );

    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message:
          "User registered successfully.",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Registration failed.",
      },
      {
        status: 500,
      }
    );
  }
}