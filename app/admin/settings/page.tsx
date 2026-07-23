import {
  requireAdmin,
} from "@/lib/auth-admin";

import {
  connectDB,
} from "@/lib/mongodb";

import {
  getStoreSettings,
} from "@/lib/services/store-settings.service";

import {
  StoreSettingsPage,
} from "@/components/admin/settings/store-settings-page";

export default async function SettingsPage() {
  // Verify admin access
  await requireAdmin();

  // Connect to MongoDB
  await connectDB();

  // Load store settings
  const settings =
    await getStoreSettings();

  return (
    <StoreSettingsPage
      settings={JSON.parse(
        JSON.stringify(
          settings
        )
      )}
    />
  );
}