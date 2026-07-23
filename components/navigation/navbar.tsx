import { Suspense } from "react";

import Container from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";

import { SearchBar } from "./search-bar";
import { NavLinks } from "./nav-links";
import { NavActions } from "./nav-actions";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  return (
    <Container>
      <div className="flex h-20 items-center gap-3 sm:gap-4 lg:gap-6">
        {/* Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <NavLinks />

        {/* Desktop Search */}
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>

        {/* Wishlist / Cart / Login */}
        <div className="ml-auto shrink-0">
          <NavActions />
        </div>

        {/* Tablet / Mobile Menu */}
        <MobileMenu />
      </div>
    </Container>
  );
}