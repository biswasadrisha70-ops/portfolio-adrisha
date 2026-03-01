"use client"

import { useEffect, useState, useMemo } from "react"
import { TiltCard } from "@/components/tilt-card"

const modes = [
  {
    id: "tactical",
    label: "Tactical View",
    code: "TAC-01",
    description: "Strategic overview of operations, intel briefings, and mission-critical data.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 sm:h-24 sm:w-24" aria-hidden="true">
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <circle cx="40" cy="40" r="24" stroke="currentColor" strokeWidth="0.5" opacity="0.25" strokeDasharray="2 3" />
        <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
        <circle cx="40" cy="40" r="2.5" fill="currentColor" opacity="0.9" />
        <line x1="40" y1="4" x2="40" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="40" y1="64" x2="40" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="4" y1="40" x2="16" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="64" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="40" y1="40" x2="40" y2="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="6s" repeatCount="indefinite" />
        </line>
        <circle cx="52" cy="28" r="2.5" fill="currentColor" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="50" r="2" fill="currentColor" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="55" cy="48" r="1.5" fill="currentColor" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
  {
    id: "combat",
    label: "Combat Simulation",
    code: "CMB-02",
    description: "Live-fire testing environment for skills, frameworks, and project deployments.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 sm:h-24 sm:w-24" aria-hidden="true">
        <path d="M40 6 L70 20 L70 50 C70 64 56 74 40 80 C24 74 10 64 10 50 L10 20 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.15" fill="none" />
        <path d="M40 14 L62 26 L62 48 C62 58 52 66 40 70 C28 66 18 58 18 48 L18 26 Z" stroke="currentColor" strokeWidth="0.75" opacity="0.3" fill="none" />
        <path d="M40 22 L54 32 L54 46 C54 52 48 58 40 60 C32 58 26 52 26 46 L26 32 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="currentColor" fillOpacity="0.03" />
        <line x1="40" y1="28" x2="40" y2="58" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        <line x1="26" y1="43" x2="54" y2="43" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        <path d="M40 34 L48 43 L40 52 L32 43 Z" stroke="currentColor" strokeWidth="1" opacity="0.6" fill="currentColor" fillOpacity="0.08" />
        <circle cx="40" cy="43" r="3" fill="currentColor" opacity="0.8">
          <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.5;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
] as const

interface ModeSelectProps {
  selectedRole: string
  onBack: () => void
}

export function ModeSelect({ selectedRole, onBack }: ModeSelectProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedMode, setSelectedMode] = useState<string | null>(null)

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
      {/* Cinematic animated gradient background */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(120, 20, 20, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(100, 15, 15, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(80, 10, 10, 0.04) 0%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
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
        onClick={onBack}
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
        {/* Red ambient glow behind cards */}
        <div
          aria-hidden="true"
          className="animate-pulse-glow pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(150, 30, 30, 0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
            transform: "scale(1.3)",
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
                  onClick={() => setSelectedMode(isSelected ? null : mode.id)}
                  className={`group relative flex w-full cursor-pointer flex-col items-center gap-7 overflow-hidden rounded-lg border px-8 py-14 text-center backdrop-blur-sm transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-[380px] sm:py-16 ${
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
                      background: "radial-gradient(ellipse at 50% 40%, rgba(150, 30, 30, 0.08) 0%, transparent 70%)",
                    }}
                  />

                  {/* Corner brackets */}
                  <span className={`absolute -left-px -top-px h-6 w-6 border-l border-t transition-colors duration-500 ${isSelected ? "border-danger/80" : "border-border/40 group-hover:border-danger/50"}`} />
                  <span className={`absolute -right-px -top-px h-6 w-6 border-r border-t transition-colors duration-500 ${isSelected ? "border-danger/80" : "border-border/40 group-hover:border-danger/50"}`} />
                  <span className={`absolute -bottom-px -left-px h-6 w-6 border-b border-l transition-colors duration-500 ${isSelected ? "border-danger/80" : "border-border/40 group-hover:border-danger/50"}`} />
                  <span className={`absolute -bottom-px -right-px h-6 w-6 border-b border-r transition-colors duration-500 ${isSelected ? "border-danger/80" : "border-border/40 group-hover:border-danger/50"}`} />

                  {/* Mode code */}
                  <span
                    className={`relative z-10 font-mono text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 ${
                      isSelected ? "text-danger/60" : "text-muted-foreground/30 group-hover:text-danger/40"
                    }`}
                  >
                    {mode.code}
                  </span>

                  {/* Icon */}
                  <div
                    className={`relative z-10 transition-all duration-500 ${
                      isSelected ? "text-danger" : "text-muted-foreground/30 group-hover:text-danger/60"
                    }`}
                  >
                    {mode.icon}
                  </div>

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
                    className={`relative z-10 mt-2 h-px w-16 transition-all duration-500 ${
                      isSelected
                        ? "scale-x-100 bg-danger"
                        : "scale-x-50 bg-border/40 group-hover:scale-x-75 group-hover:bg-danger/40"
                    }`}
                  />
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
