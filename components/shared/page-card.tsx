type PageCardProps = {
  title: string;
  children: React.ReactNode;
};

export function PageCard({
  title,
  children,
}: PageCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        {title}
      </h2>

      {children}
    </div>
  );
}