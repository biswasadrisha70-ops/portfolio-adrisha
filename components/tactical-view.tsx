"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import Image from "next/image"
import {
  User,
  Crosshair,
  FileText,
  Users,
  Radio,
} from "lucide-react"
import { useSound } from "@/hooks/use-sound"

// --------------- DATA ---------------

interface TacticalModule {
  id: string
  label: string
  icon: React.ElementType
  /** Angle in degrees (0 = top, clockwise) */
  angle: number
}

const MODULES: TacticalModule[] = [
  { id: "profile", label: "Agent Profile", icon: User, angle: 225 },
  { id: "abilities", label: "Core Abilities", icon: Crosshair, angle: 280 },
  { id: "missions", label: "Mission Log", icon: FileText, angle: 335 },
  { id: "squads", label: "Squads & Alliances", icon: Users, angle: 30 },
  { id: "contact", label: "Contact Channels", icon: Radio, angle: 135 },
]

// Orbit radius
const ORBIT_R = 220

// --------------- MAIN COMPONENT ---------------

interface TacticalViewProps {
  selectedRole: string
  onBack?: () => void
}

export function TacticalView({ selectedRole, onBack }: TacticalViewProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const { playClick } = useSound()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const handleIconClick = useCallback(
    (moduleId: string) => {
      playClick()
      // Future: navigate to a full-screen module page
      // For now, no overlay panels -- clicking is wired for navigation
    },
    [playClick]
  )

  const handleBack = useCallback(() => {
    playClick()
    onBack?.()
  }, [playClick, onBack])

  // Aura drift particles
  const auraParticles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        angle: (360 / 18) * i + Math.random() * 15,
        distance: 60 + Math.random() * 120,
        size: Math.random() * 2.5 + 0.8,
        duration: `${Math.random() * 5 + 4}s`,
        delay: `${Math.random() * 4}s`,
        opacity: Math.random() * 0.45 + 0.1,
      })),
    []
  )

  // Background floating particles
  const bgParticles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.8 + 0.5,
        duration: `${Math.random() * 10 + 7}s`,
        delay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.25 + 0.05,
      })),
    []
  )

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0e" }}
    >
      {/* ============ BACKGROUND LAYERS ============ */}

      {/* Red nebula ambient */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(140,20,20,0.1) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 30% 60%, rgba(100,15,15,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 70% 40%, rgba(120,10,10,0.05) 0%, transparent 50%)",
          backgroundSize: "300% 300%",
          filter: "blur(80px)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,50,50,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(180,50,50,0.02) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Scanning line */}
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(180,50,50,0.08) 20%, rgba(180,50,50,0.18) 50%, rgba(180,50,50,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 20px 3px rgba(180,50,50,0.04)",
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="animate-noise pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Background floating particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {bgParticles.map((p) => (
          <div
            key={p.id}
            className="animate-float-particle absolute rounded-full"
            style={{
              left: p.left,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: `rgba(180,50,50,${p.opacity})`,
              boxShadow: `0 0 ${p.size * 4}px rgba(180,50,50,${p.opacity * 0.4})`,
              ["--duration" as string]: p.duration,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
      </div>

      {/* ============ BACK BUTTON (top-left) ============ */}
      {onBack && (
        <button
          onClick={handleBack}
          className={`group absolute left-8 top-8 z-50 flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 transition-all duration-500 hover:text-danger/80 sm:left-12 sm:top-10 ${
            mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
          aria-label="Go back"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back</span>
        </button>
      )}

      {/* ============ IDENTITY BADGE (bottom-left corner) ============ */}
      <div
        className={`absolute bottom-8 left-8 z-30 transition-all duration-700 delay-500 sm:bottom-10 sm:left-12 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-danger/40">
            Operator
          </p>
          <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-foreground/85 sm:text-base">
            Adrisha Biswas
          </h2>
          <p className="font-mono text-[9px] leading-relaxed tracking-wider text-muted-foreground/35 sm:text-[10px]">
            {"First-year B.Tech | Developer | Community Lead"}
          </p>
        </div>
      </div>

      {/* ============ CENTER: AVATAR + AURA + ICONS ============ */}
      <div
        className={`relative z-20 flex items-center justify-center transition-all duration-1000 ${
          mounted ? "scale-100 opacity-100" : "scale-[0.92] opacity-0"
        }`}
      >
        {/* Outer decorative HUD ring */}
        <div
          aria-hidden="true"
          className="animate-loader-spin-slow pointer-events-none absolute rounded-full"
          style={{
            width: `${ORBIT_R * 2 + 60}px`,
            height: `${ORBIT_R * 2 + 60}px`,
            border: "1px solid rgba(180,50,50,0.04)",
            borderTopColor: "rgba(180,50,50,0.1)",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-loader-spin-reverse-slow pointer-events-none absolute rounded-full"
          style={{
            width: `${ORBIT_R * 2 + 30}px`,
            height: `${ORBIT_R * 2 + 30}px`,
            border: "1px dashed rgba(180,50,50,0.025)",
            borderBottomColor: "rgba(180,50,50,0.06)",
          }}
        />

        {/* Aura layer 1 -- wide diffuse */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse pointer-events-none absolute"
          style={{
            width: "380px",
            height: "480px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(160,30,30,0.14) 0%, rgba(120,15,15,0.04) 50%, transparent 72%)",
            filter: "blur(50px)",
          }}
        />
        {/* Aura layer 2 -- tighter core glow */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse-delayed pointer-events-none absolute"
          style={{
            width: "260px",
            height: "360px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(190,45,45,0.12) 0%, transparent 65%)",
            filter: "blur(35px)",
          }}
        />
        {/* Aura layer 3 -- subtle rim light */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse pointer-events-none absolute"
          style={{
            width: "200px",
            height: "300px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 55%, rgba(220,60,60,0.06) 0%, transparent 55%)",
            filter: "blur(20px)",
            animationDelay: "0.8s",
          }}
        />

        {/* Aura drift particles */}
        <div aria-hidden="true" className="pointer-events-none absolute">
          {auraParticles.map((p) => {
            const rad = (p.angle * Math.PI) / 180
            const x = Math.cos(rad) * p.distance
            const y = Math.sin(rad) * p.distance
            return (
              <div
                key={p.id}
                className="animate-aura-particle absolute rounded-full"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                  backgroundColor: `rgba(180,50,50,${p.opacity})`,
                  boxShadow: `0 0 ${p.size * 3}px rgba(180,50,50,${p.opacity * 0.5})`,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                  ["--drift-x" as string]: `${(Math.random() - 0.5) * 30}px`,
                  ["--drift-y" as string]: `${(Math.random() - 0.5) * 30}px`,
                }}
              />
            )
          })}
        </div>

        {/* Operator avatar with idle float */}
        <div
          className="animate-avatar-float relative"
          style={{ width: "300px", height: "420px" }}
        >
          <Image
            src="/images/operator-avatar.png"
            alt="Operator avatar - Adrisha Biswas"
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(160,30,30,0.2)]"
            style={{ objectPosition: "center bottom" }}
            priority
          />
          {/* Floor reflection */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3 left-1/2 h-6 w-36 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(180,40,40,0.15) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
        </div>

        {/* ============ RADIAL TACTICAL ICONS ============ */}
        {MODULES.map((mod) => {
          const Icon = mod.icon
          const isHovered = hoveredIcon === mod.id

          // Convert angle (0=top, clockwise) to radians
          const rad = ((mod.angle - 90) * Math.PI) / 180
          const x = Math.cos(rad) * ORBIT_R
          const y = Math.sin(rad) * ORBIT_R

          return (
            <div
              key={mod.id}
              className={`absolute transition-all duration-700 ${
                mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              style={{
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                transitionDelay: `${MODULES.indexOf(mod) * 120 + 300}ms`,
              }}
            >
              <button
                onClick={() => handleIconClick(mod.id)}
                onMouseEnter={() => setHoveredIcon(mod.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0e] ${
                  isHovered
                    ? "border-danger/50 bg-danger/[0.1] shadow-[0_0_24px_-4px] shadow-danger/25"
                    : "border-danger/15 bg-[#0a0a0e]/60 hover:border-danger/40 hover:bg-danger/[0.06]"
                }`}
                aria-label={mod.label}
              >
                <Icon
                  className={`h-4 w-4 transition-colors duration-300 ${
                    isHovered
                      ? "text-danger/90"
                      : "text-danger/40 group-hover:text-danger/70"
                  }`}
                />
              </button>

              {/* Hover label */}
              <div
                className={`pointer-events-none absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                  isHovered
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
              >
                <span className="rounded border border-danger/10 bg-[#0a0a0e]/90 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.25em] text-danger/60 shadow-lg backdrop-blur-sm">
                  {mod.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ============ BOTTOM VERSION TAG ============ */}
      <div
        className={`absolute bottom-8 right-8 z-20 transition-all duration-700 delay-700 sm:bottom-10 sm:right-12 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/20">
          Tactical Command v1.0
        </p>
      </div>
    </div>
  )
}
