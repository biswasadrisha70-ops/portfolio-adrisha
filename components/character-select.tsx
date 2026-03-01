"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { TiltCard } from "@/components/tilt-card"
import {
  RecruiterIcon,
  TeammateIcon,
  ExplorerIcon,
  StudentIcon,
} from "@/components/role-icons"

const roles = [
  {
    id: "recruiter",
    label: "Recruiter",
    description: "Evaluating talent & potential",
    Icon: RecruiterIcon,
    code: "RCR-01",
    portrait: "/images/recruiter-portrait.png",
  },
  {
    id: "teammate",
    label: "Teammate",
    description: "Collaborating on the mission",
    Icon: TeammateIcon,
    code: "TMT-02",
  },
  {
    id: "explorer",
    label: "Explorer",
    description: "Discovering new terrain",
    Icon: ExplorerIcon,
    code: "XPL-03",
  },
  {
    id: "student",
    label: "Student",
    description: "Learning the craft",
    Icon: StudentIcon,
    code: "STU-04",
  },
] as const

export function CharacterSelect() {
  const [mounted, setMounted] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col items-center gap-12 md:gap-16">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="h-px w-8 bg-border" />
          <span>Identify Yourself</span>
          <span className="h-px w-8 bg-border" />
        </div>

        <h1
          className={`font-mono text-2xl font-bold uppercase tracking-[0.12em] text-foreground transition-all duration-700 delay-150 sm:text-3xl md:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="text-primary">{"Select"}</span> Your Role
        </h1>

        <p
          className={`max-w-md font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all duration-700 delay-300 sm:text-sm ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          How would you like to access this dossier?
        </p>
      </div>

      {/* Cards grid */}
      <div
        className={`grid w-full max-w-5xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 transition-all duration-700 delay-500 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {roles.map((role) => {
          const isSelected = selectedId === role.id
          const hasPortrait = "portrait" in role && role.portrait
          return (
            <TiltCard key={role.id}>
              <button
                onClick={() => setSelectedId(isSelected ? null : role.id)}
                className={`group relative flex w-full cursor-pointer flex-col items-center gap-6 overflow-hidden rounded-lg border bg-card/50 px-6 py-10 text-center backdrop-blur-sm transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isSelected
                    ? "border-primary/60 bg-primary/5 shadow-[0_0_40px_-10px] shadow-primary/20"
                    : "border-border/50 hover:border-primary/30 hover:bg-card/80"
                } ${hasPortrait ? "min-h-[340px] justify-end" : ""}`}
                aria-pressed={isSelected}
                aria-label={`Select role: ${role.label}`}
              >
                {/* Portrait background for cards with images */}
                {hasPortrait && (
                  <>
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={role.portrait}
                        alt=""
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority
                      />
                    </div>
                    {/* Dark gradient overlay from bottom */}
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/70 to-transparent" />
                    {/* Soft teal glow on hover */}
                    <div className="pointer-events-none absolute inset-0 z-[2] bg-primary/0 transition-colors duration-500 group-hover:bg-primary/5" />
                  </>
                )}

                {/* Corner brackets */}
                <span className={`absolute -left-px -top-px z-10 h-4 w-4 border-l border-t transition-colors duration-500 ${isSelected ? "border-primary" : "border-border/60 group-hover:border-primary/50"}`} />
                <span className={`absolute -right-px -top-px z-10 h-4 w-4 border-r border-t transition-colors duration-500 ${isSelected ? "border-primary" : "border-border/60 group-hover:border-primary/50"}`} />
                <span className={`absolute -bottom-px -left-px z-10 h-4 w-4 border-b border-l transition-colors duration-500 ${isSelected ? "border-primary" : "border-border/60 group-hover:border-primary/50"}`} />
                <span className={`absolute -bottom-px -right-px z-10 h-4 w-4 border-b border-r transition-colors duration-500 ${isSelected ? "border-primary" : "border-border/60 group-hover:border-primary/50"}`} />

                {/* Role code */}
                <span
                  className={`relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${
                    isSelected ? "text-primary/70" : hasPortrait ? "text-foreground/40 group-hover:text-foreground/70" : "text-muted-foreground/40 group-hover:text-muted-foreground/70"
                  }`}
                >
                  {role.code}
                </span>

                {/* Icon - only show for non-portrait cards */}
                {!hasPortrait && (
                  <role.Icon
                    className={`h-20 w-20 transition-colors duration-500 ${
                      isSelected ? "text-primary" : "text-muted-foreground/50 group-hover:text-foreground/70"
                    }`}
                  />
                )}

                {/* Label */}
                <span
                  className={`relative z-10 font-mono text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
                    isSelected ? "text-primary" : hasPortrait ? "text-foreground/90 group-hover:text-foreground" : "text-foreground/80 group-hover:text-foreground"
                  }`}
                >
                  {role.label}
                </span>

                {/* Description */}
                <span
                  className={`relative z-10 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-500 ${
                    isSelected ? "text-primary/60" : hasPortrait ? "text-foreground/40 group-hover:text-foreground/60" : "text-muted-foreground/50 group-hover:text-muted-foreground/80"
                  }`}
                >
                  {role.description}
                </span>

                {/* Selection indicator */}
                <div className={`relative z-10 mt-1 h-px w-12 transition-all duration-500 ${isSelected ? "bg-primary scale-x-100" : "bg-border/50 scale-x-50 group-hover:scale-x-75 group-hover:bg-primary/40"}`} />
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
        {selectedId ? "Role selected - access granted" : "Select a role to proceed"}
      </p>
    </div>
  )
}
