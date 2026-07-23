import Image from "next/image";

export function HeroImage() {
  return (
    <div className="relative flex justify-center">
      <div className="absolute h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />

      <Image
        src="/images/hero/luxe-hero-new.png"
        alt="Luxury handbag collection"
        width={600}
        height={600}
        priority
        className="relative z-10 h-auto w-full max-w-md object-contain transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}