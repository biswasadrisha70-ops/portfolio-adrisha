"use client"

import { useEffect, useState } from "react"
import { TiltCard } from "@/components/tilt-card"

const modes = [
  {
    id: "tactical",
    label: "Tactical View",
    code: "TAC-01",
    description: "Strategic overview of operations, intel briefings, and mission-critical data.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" aria-hidden="true">
        {/* Radar sweep */}
        <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="0.75" opacity="0.3" strokeDasharray="3 4" />
        <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.8" />
        {/* Crosshairs */}
        <line x1="40" y1="6" x2="40" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="40" y1="66" x2="40" y2="74" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="6" y1="40" x2="14" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="66" y1="40" x2="74" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        {/* Sweep line */}
        <line x1="40" y1="40" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        {/* Blips */}
        <circle cx="50" cy="30" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="32" cy="48" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "combat",
    label: "Combat Simulation",
    code: "CMB-02",
    description: "Live-fire testing environment for skills, frameworks, and project deployments.",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" aria-hidden="true">
        {/* Shield / armor */}
        <path d="M40 8 L68 22 L68 48 C68 62 56 72 40 78 C24 72 12 62 12 48 L12 22 Z" stroke="currentColor" strokeWidth="1" opacity="0.25" fill="none" />
        <path d="M40 18 L58 28 L58 46 C58 56 50 63 40 67 C30 63 22 56 22 46 L22 28 Z" stroke="currentColor" strokeWidth="0.75" opacity="0.4" fill="none" />
        {/* Inner cross / target */}
        <line x1="40" y1="30" x2="40" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="28" y1="43" x2="52" y2="43" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        {/* Center diamond */}
        <path d="M40 36 L46 43 L40 50 L34 43 Z" stroke="currentColor" strokeWidth="1" opacity="0.6" fill="currentColor" fillOpacity="0.1" />
        <circle cx="40" cy="43" r="2" fill="currentColor" opacity="0.7" />
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

  return (
    <div className="flex flex-col items-center gap-14 md:gap-16">
      {/* Back button */}
      <button
        onClick={onBack}
        className={`group absolute left-6 top-6 z-30 flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60 transition-all duration-500 hover:text-primary sm:left-10 sm:top-10 ${
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
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="h-px w-8 bg-border" />
          <span>{"Role Confirmed: "}{selectedRole}</span>
          <span className="h-px w-8 bg-border" />
        </div>

        <h1
          className={`font-mono text-2xl font-bold uppercase tracking-[0.12em] text-foreground transition-all duration-700 delay-150 sm:text-3xl md:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="text-primary">{"Choose"}</span> Your Mode
        </h1>

        <p
          className={`max-w-md font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all duration-700 delay-300 sm:text-sm ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          How would you like to access this dossier?
        </p>
      </div>

      {/* Mode cards */}
      <div
        className={`grid w-full max-w-3xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:gap-8 transition-all duration-700 delay-500 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {modes.map((mode) => {
          const isSelected = selectedMode === mode.id
          return (
            <TiltCard key={mode.id}>
              <button
                onClick={() => setSelectedMode(isSelected ? null : mode.id)}
                className={`group relative flex w-full cursor-pointer flex-col items-center gap-8 overflow-hidden rounded-lg border px-8 py-12 text-center backdrop-blur-sm transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-14 ${
                  isSelected
                    ? "border-primary/60 bg-primary/5 shadow-[0_0_60px_-10px] shadow-primary/25"
                    : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_0_40px_-15px] hover:shadow-primary/15"
                }`}
                aria-pressed={isSelected}
                aria-label={`Select mode: ${mode.label}`}
              >
                {/* Corner brackets */}
                <span className={`absolute -left-px -top-px h-5 w-5 border-l border-t transition-colors duration-500 ${isSelected ? "border-primary" : "border-border/60 group-hover:border-primary/50"}`} />
                <span className={`absolute -right-px -top-px h-5 w-5 border-r border-t transition-colors duration-500 ${isSelected ? "border-primary" : "border-border/60 group-hover:border-primary/50"}`} />
                <span className={`absolute -bottom-px -left-px h-5 w-5 border-b border-l transition-colors duration-500 ${isSelected ? "border-primary" : "border-border/60 group-hover:border-primary/50"}`} />
                <span className={`absolute -bottom-px -right-px h-5 w-5 border-b border-r transition-colors duration-500 ${isSelected ? "border-primary" : "border-border/60 group-hover:border-primary/50"}`} />

                {/* Mode code */}
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${
                    isSelected ? "text-primary/70" : "text-muted-foreground/40 group-hover:text-muted-foreground/70"
                  }`}
                >
                  {mode.code}
                </span>

                {/* Icon */}
                <div
                  className={`transition-colors duration-500 ${
                    isSelected ? "text-primary" : "text-muted-foreground/40 group-hover:text-foreground/60"
                  }`}
                >
                  {mode.icon}
                </div>

                {/* Label */}
                <span
                  className={`font-mono text-lg font-semibold uppercase tracking-[0.2em] transition-colors duration-500 sm:text-xl ${
                    isSelected ? "text-primary" : "text-foreground/80 group-hover:text-foreground"
                  }`}
                >
                  {mode.label}
                </span>

                {/* Description */}
                <span
                  className={`max-w-[280px] font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] transition-colors duration-500 ${
                    isSelected ? "text-primary/50" : "text-muted-foreground/40 group-hover:text-muted-foreground/70"
                  }`}
                >
                  {mode.description}
                </span>

                {/* Selection indicator line */}
                <div className={`mt-2 h-px w-16 transition-all duration-500 ${isSelected ? "bg-primary scale-x-100" : "bg-border/50 scale-x-50 group-hover:scale-x-75 group-hover:bg-primary/40"}`} />
              </button>
            </TiltCard>
          )
        })}
      </div>

      {/* Bottom instruction */}
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 transition-all duration-700 delay-700 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {selectedMode ? "Mode locked - standing by" : "Select a mode to proceed"}
      </p>
    </div>
  )
}
