import Container from "@/components/ui/Container";
import { BRAND } from "@/constants/brand";
export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-white">
            <Container>
                <div className="py-8 text-center">
                    <p className="text-sm text-[var(--secondary)]">
                        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}