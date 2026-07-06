type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}