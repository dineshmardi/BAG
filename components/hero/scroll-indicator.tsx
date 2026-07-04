import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="flex justify-center pt-12">
      <div className="flex flex-col items-center text-muted-foreground animate-bounce">
        <span className="mb-2 text-xs uppercase tracking-[0.3em]">
          Scroll
        </span>

        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
}