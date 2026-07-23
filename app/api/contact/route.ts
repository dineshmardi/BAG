import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const {
      name,
      email,
      subject,
      message,
    } = body;

    // Basic validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          message:
            "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Create contact message
    const contact =
      await Contact.create({
        name: name.trim(),
        email: email.trim(),
        subject:
          subject.trim(),
        message:
          message.trim(),
      });

    return NextResponse.json(
      {
        message:
          "Message sent successfully.",
        contactId:
          contact._id.toString(),
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Contact API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}