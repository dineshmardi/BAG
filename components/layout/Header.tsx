import { Navbar } from "@/components/navigation/navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Navbar />
    </header>
  );
}