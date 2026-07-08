import { requireAdminApi } from "@/lib/auth-admin-api";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getStoreSettings } from "@/lib/services/store-settings.service";

export async function PUT(request: Request) {
    try {
        await connectDB();
        const authResponse = await requireAdminApi();

        if (authResponse) {
            return authResponse;
        }



        const body = await request.json();

        const settings =
            await getStoreSettings();

        Object.assign(settings, body);

        await settings.save();

        return NextResponse.json(settings);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message:
                    "Failed to update settings.",
            },
            {
                status: 500,
            }
        );
    }
}