import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import { connectDB } from "@/lib/mongodb";
import { getStoreSettings } from "@/lib/services/store-settings.service";

import { MaintenancePage } from "@/components/maintenance/maintenance-page";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();

  const settings =
    await getStoreSettings();

  // Show maintenance page to storefront visitors
  if (settings.maintenanceMode) {
    return (
      <MaintenancePage
        title={
          settings.maintenanceTitle ||
          "We'll Be Back Soon"
        }
        message={
          settings.maintenanceMessage ||
          "We're currently making improvements to Luxe Bags. Please check back shortly."
        }
      />
    );
  }

  // Normal storefront
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}