export function Scanlines() {
  return (
    <>
      {/* Static scanline pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />
      {/* Subtle moving scan sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[200px] animate-scan-sweep opacity-[0.025]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,200,255,0.08) 40%, rgba(0,200,255,0.12) 50%, rgba(0,200,255,0.08) 60%, transparent 100%)",
        }}
      />
    </>
  )
}
