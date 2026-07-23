import Container from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <Logo showTagline />

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}