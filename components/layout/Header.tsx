import Container from "@/components/ui/Container";
import { BRAND } from "@/constants/brand";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">
            {BRAND.name}
          </h1>

          <nav className="hidden gap-8 md:flex">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Collections</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </Container>
    </header>
  );
}