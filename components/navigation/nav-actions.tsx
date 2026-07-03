import {
  Heart,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function NavActions() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" aria-label="Wishlist">
        <Heart className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" aria-label="Cart">
        <ShoppingBag className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" aria-label="Account">
        <User className="h-5 w-5" />
      </Button>
    </div>
  );
}