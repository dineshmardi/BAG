import { HeroBackground } from "./hero-background";
import { HeroButtons } from "./hero-buttons";
import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";
import { ScrollIndicator } from "./scroll-indicator";

export function Hero() {
    return (
        <section className="relative overflow-hidden">
            <HeroBackground />

            <div className="mx-auto grid min-h-[calc(100vh-104px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <HeroContent />

                    <div className="mt-8">
                        <HeroButtons />
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <HeroImage />
                </div>
            </div>

            <ScrollIndicator />
        </section>
    );
}