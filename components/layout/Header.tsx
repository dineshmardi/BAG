export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold">
          Luxe Bags
        </h1>

        <nav className="hidden md:flex gap-8">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Collections</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}