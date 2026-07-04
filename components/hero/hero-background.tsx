export function HeroBackground() {
  return (
    <>
      {/* Main Background Gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#faf9f6] via-white to-[#f4efe6]" />

      {/* Left Glow */}
      <div className="absolute left-0 top-20 -z-10 h-96 w-96 rounded-full bg-[#c8a96a]/10 blur-3xl" />

      {/* Right Glow */}
      <div className="absolute right-0 top-40 -z-10 h-[450px] w-[450px] rounded-full bg-[#c8a96a]/15 blur-3xl" />

      {/* Decorative Circle */}
      <div className="absolute right-32 top-28 -z-10 h-[500px] w-[500px] rounded-full border border-[#c8a96a]/20" />
    </>
  );
}