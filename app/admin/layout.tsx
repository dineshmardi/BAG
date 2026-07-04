export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold">
          Luxe Bags Admin
        </h1>
      </div>

      <main className="p-8">
        {children}
      </main>
    </div>
  );
}