"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import Image from "next/image"
import { TiltCard } from "@/components/tilt-card"
import { useSound } from "@/hooks/use-sound"

const modes = [
  {
    id: "tactical",
    label: "Tactical View",
    code: "TAC-01",
    description: "Strategic overview of operations, intel briefings, and mission-critical data.",
    image: "/images/tactical-view.png",
  },
  {
    id: "combat",
    label: "Combat Simulation",
    code: "CMB-02",
    description: "Live-fire testing environment for skills, frameworks, and project deployments.",
    image: "/images/combat-simulation.png",
  },
] as const

interface ModeSelectProps {
  selectedRole: string
  onBack: () => void
}

export function ModeSelect({ selectedRole, onBack }: ModeSelectProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const { playClick, playTactical, playCombat } = useSound()

  const handleModeSelect = useCallback(
    (modeId: string) => {
      const isAlreadySelected = selectedMode === modeId
      if (isAlreadySelected) {
        playClick()
        setSelectedMode(null)
      } else {
        if (modeId === "tactical") playTactical()
        else if (modeId === "combat") playCombat()
        setSelectedMode(modeId)
      }
    },
    [selectedMode, playClick, playTactical, playCombat]
  )

  const handleBack = useCallback(() => {
    playClick()
    onBack()
  }, [playClick, onBack])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: `${Math.random() * 10 + 8}s`,
        delay: `${Math.random() * 8}s`,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    []
  )

  return (
    <div className="flex flex-col items-center gap-14 md:gap-16">
      {/* === CINEMATIC BACKGROUND SYSTEM === */}

      {/* Layer 1: Primary slow-moving deep red gradient */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(120, 18, 18, 0.10) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 80% 70%, rgba(100, 12, 12, 0.08) 0%, transparent 55%)",
          backgroundSize: "300% 300%",
          filter: "blur(80px)",
        }}
      />

      {/* Layer 2: Counter-moving secondary gradient for depth */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift-alt pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 60% 20%, rgba(140, 20, 20, 0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 70% at 30% 80%, rgba(90, 10, 10, 0.07) 0%, transparent 55%)",
          backgroundSize: "300% 300%",
          filter: "blur(100px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Layer 3: Slow breathing ambient wash */}
      <div
        aria-hidden="true"
        className="animate-cinematic-breathe pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(110, 15, 15, 0.07) 0%, transparent 65%)",
          filter: "blur(120px)",
          ["--breathe-min" as string]: "0.04",
          ["--breathe-max" as string]: "0.10",
          ["--breathe-mid" as string]: "0.06",
        }}
      />

      {/* Noise texture overlay for film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Floating particles */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="animate-float-particle absolute rounded-full"
            style={{
              left: p.left,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: `rgba(180, 50, 50, ${p.opacity})`,
              ["--duration" as string]: p.duration,
              ["--delay" as string]: p.delay,
              boxShadow: `0 0 ${p.size * 3}px rgba(180, 50, 50, ${p.opacity * 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={handleBack}
        className={`group absolute left-6 top-6 z-30 flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60 transition-all duration-500 hover:text-danger sm:left-10 sm:top-10 ${
          mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
        aria-label="Go back to role selection"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        >
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Back</span>
      </button>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <div
          className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="h-px w-10 bg-danger/30" />
          <span className="text-danger/70">{"Role Confirmed: "}{selectedRole}</span>
          <span className="h-px w-10 bg-danger/30" />
        </div>

        <h1
          className={`font-mono text-3xl font-bold uppercase tracking-[0.12em] text-foreground transition-all duration-700 delay-150 sm:text-4xl md:text-5xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="text-danger">{"Select"}</span> Mode
        </h1>

        <p
          className={`max-w-md font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70 transition-all duration-700 delay-300 sm:text-sm ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          How would you like to access this dossier?
        </p>

        {/* Decorative line */}
        <div
          className={`h-px w-20 bg-danger/20 transition-all duration-700 delay-400 ${
            mounted ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        />
      </div>

      {/* Mode cards with red ambient glow behind */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        {/* Red ambient glow behind cards - layered for depth */}
        <div
          aria-hidden="true"
          className="animate-pulse-glow pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(140, 25, 25, 0.14) 0%, rgba(100, 15, 15, 0.06) 40%, transparent 70%)",
            filter: "blur(70px)",
            transform: "scale(1.4) translateY(-5%)",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-cinematic-breathe pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(160, 30, 30, 0.08) 0%, transparent 55%)",
            filter: "blur(50px)",
            transform: "scale(1.2)",
            ["--breathe-min" as string]: "0.3",
            ["--breathe-max" as string]: "0.7",
            ["--breathe-mid" as string]: "0.5",
          }}
        />

        <div
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 transition-all duration-700 delay-500 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {modes.map((mode) => {
            const isSelected = selectedMode === mode.id
            return (
              <TiltCard key={mode.id} glowColor="var(--danger)">
                <button
                  onClick={() => handleModeSelect(mode.id)}
                  className={`group relative flex w-full cursor-pointer flex-col items-center gap-5 overflow-hidden rounded-lg border text-center backdrop-blur-sm transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isSelected
                      ? "border-danger/60 bg-danger/[0.06] shadow-[0_0_80px_-10px] shadow-danger-glow/30"
                      : "border-border/40 bg-card/40 hover:border-danger/40 hover:bg-card/60 hover:shadow-[0_0_60px_-15px] hover:shadow-danger-glow/20"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Select mode: ${mode.label}`}
                >
                  {/* Inner ambient glow on selected */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    }`}
                    style={{
                      background: "radial-gradient(ellipse at 50% 30%, rgba(150, 30, 30, 0.10) 0%, transparent 70%)",
                    }}
                  />

                  {/* Corner brackets */}
                  <span className={`absolute -left-px -top-px h-6 w-6 border-l border-t transition-colors duration-500 ${isSelected ? "border-danger/80" : "border-border/40 group-hover:border-danger/50"}`} />
                  <span className={`absolute -right-px -top-px h-6 w-6 border-r border-t transition-colors duration-500 ${isSelected ? "border-danger/80" : "border-border/40 group-hover:border-danger/50"}`} />
                  <span className={`absolute -bottom-px -left-px h-6 w-6 border-b border-l transition-colors duration-500 ${isSelected ? "border-danger/80" : "border-border/40 group-hover:border-danger/50"}`} />
                  <span className={`absolute -bottom-px -right-px h-6 w-6 border-b border-r transition-colors duration-500 ${isSelected ? "border-danger/80" : "border-border/40 group-hover:border-danger/50"}`} />

                  {/* Image preview container -- 5:4 aspect ratio */}
                  <div className="relative w-full overflow-hidden">
                    {/* Red glow around image container */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -inset-2 z-0 transition-opacity duration-700 ${
                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                      style={{
                        background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(140, 25, 25, 0.18) 0%, transparent 65%)",
                        filter: "blur(20px)",
                      }}
                    />

                    <div className="relative aspect-[5/4] w-full overflow-hidden">
                      {/* Image with hover zoom */}
                      <Image
                        src={mode.image}
                        alt={`${mode.label} preview`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                        style={{
                          transform: isSelected ? "scale(1.1)" : undefined,
                        }}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        priority
                      />

                      {/* Dark overlay for readability */}
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 transition-all duration-500 ${
                          isSelected
                            ? "bg-black/40"
                            : "bg-black/55 group-hover:bg-black/40"
                        }`}
                      />

                      {/* Bottom gradient fade into card body */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1/3"
                        style={{
                          background: isSelected
                            ? "linear-gradient(to top, rgba(10,6,6,0.95) 0%, rgba(10,6,6,0.4) 60%, transparent 100%)"
                            : "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)",
                        }}
                      />

                      {/* Mode code on top of image */}
                      <div className="absolute left-0 right-0 top-0 flex justify-center pt-4">
                        <span
                          className={`relative z-10 font-mono text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 ${
                            isSelected ? "text-danger/70" : "text-muted-foreground/40 group-hover:text-danger/50"
                          }`}
                        >
                          {mode.code}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card body: title, description, indicator */}
                  <div className="flex flex-col items-center gap-4 px-6 pb-8 pt-1">
                    {/* Label */}
                    <span
                      className={`relative z-10 font-mono text-lg font-bold uppercase tracking-[0.2em] transition-colors duration-500 sm:text-xl ${
                        isSelected ? "text-danger" : "text-foreground/70 group-hover:text-foreground/90"
                      }`}
                    >
                      {mode.label}
                    </span>

                    {/* Description */}
                    <span
                      className={`relative z-10 max-w-[260px] font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] transition-colors duration-500 ${
                        isSelected ? "text-danger/40" : "text-muted-foreground/30 group-hover:text-muted-foreground/60"
                      }`}
                    >
                      {mode.description}
                    </span>

                    {/* Selection indicator line */}
                    <div
                      className={`relative z-10 mt-1 h-px w-16 transition-all duration-500 ${
                        isSelected
                          ? "scale-x-100 bg-danger"
                          : "scale-x-50 bg-border/40 group-hover:scale-x-75 group-hover:bg-danger/40"
                      }`}
                    />
                  </div>
                </button>
              </TiltCard>
            )
          })}
        </div>
      </div>

      {/* Bottom instruction */}
      <p
        className={`relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-700 delay-700 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } ${selectedMode ? "text-danger/50" : "text-muted-foreground/30"}`}
      >
        {selectedMode ? "Mode locked -- standing by" : "Select a mode to proceed"}
      </p>
    </div>
  )
}
