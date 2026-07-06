type EmptyStateProps = {
  message: string;
};

export function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border p-8 text-center">
      <p className="text-muted-foreground">
        {message}
      </p>
    </div>
  );
}