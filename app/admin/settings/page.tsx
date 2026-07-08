import { requireAdmin } from "@/lib/auth-admin";
import { connectDB } from "@/lib/mongodb";

import { getStoreSettings } from "@/lib/services/store-settings.service";

import { StoreSettingsPage } from "@/components/admin/settings/store-settings-page";

export default async function SettingsPage() {
    await connectDB();

    // await requireAdmin();

    // We'll add admin-role verification later.

    const settings =
        await getStoreSettings();

    return (
        <StoreSettingsPage
            settings={JSON.parse(
                JSON.stringify(settings)
            )}
        />
    );
}