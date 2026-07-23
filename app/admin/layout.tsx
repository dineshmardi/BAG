import { requireAdmin } from "@/lib/auth-admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminNotificationBell } from "@/components/admin/admin-notification-bell";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#f7f7f7] lg:grid lg:grid-cols-[288px_minmax(0,1fr)]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Admin Area */}
      <div className="min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#a98235]">
              LUXE BAGS
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Admin Management
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <AdminNotificationBell />

            <a
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold leading-none transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              View Store
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-w-0 p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}