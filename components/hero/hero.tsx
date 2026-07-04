import { HeroButtons } from "./hero-buttons";
import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";
import { ScrollIndicator } from "./scroll-indicator";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100vh-104px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <HeroContent />

          <div className="mt-8">
            <HeroButtons />
          </div>
        </div>

        <HeroImage />
      </div>

      <ScrollIndicator />
    </section>
  );
}