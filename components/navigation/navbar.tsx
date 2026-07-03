import Container from "@/components/ui/Container";
import { Logo } from "@/components/brand/logo";

import { NavLinks } from "./nav-links";
import { NavActions } from "./nav-actions";

export function Navbar() {
  return (
    <Container>
      <div className="flex h-20 items-center justify-between">
        <Logo />

        <NavLinks />

        <NavActions />
      </div>
    </Container>
  );
}