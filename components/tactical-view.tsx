"use client"

import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { User, Crosshair, FileText, Users, Radio } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { TacticalHudFrame } from "@/components/tactical-hud-frame"

// --------------- DATA ---------------

interface TacticalModule {
  id: string
  label: string
  icon: React.ElementType
  /** Angle in degrees (0 = top, clockwise) */
  angle: number
  /** Which side the info panel opens on */
  panelSide: "left" | "right"
}

const MODULES: TacticalModule[] = [
  { id: "profile",   label: "Agent Profile",       icon: User,      angle: 234, panelSide: "left"  },
  { id: "abilities", label: "Core Abilities",       icon: Crosshair, angle: 306, panelSide: "right" },
  { id: "missions",  label: "Mission Log",          icon: FileText,  angle: 18,  panelSide: "right" },
  { id: "squads",    label: "Squads & Alliances",   icon: Users,     angle: 90,  panelSide: "right" },
  { id: "contact",   label: "Contact Channels",     icon: Radio,     angle: 162, panelSide: "left"  },
]

// Panel content for each module
const PANEL_CONTENT: Record<string, { title: string; lines: string[] }> = {
  profile: {
    title: "Agent Profile",
    lines: [
      "Codename: PHANTOM",
      "Rank: Operative-I",
      "Clearance: Level 3",
      "Status: Active Deployment",
      "Specialization: Interface Engineering",
    ],
  },
  abilities: {
    title: "Core Abilities",
    lines: [
      "React / Next.js .......... 90%",
      "TypeScript ............... 85%",
      "UI/UX Design ............ 80%",
      "Backend Systems ......... 70%",
      "Leadership .............. 88%",
    ],
  },
  missions: {
    title: "Mission Log",
    lines: [
      "[ACTIVE]  Portfolio System v2.0",
      "[ACTIVE]  Community Platform Build",
      "[DONE]    College Tech Fest Site",
      "[DONE]    Discord Bot Framework",
      "[QUEUED]  Open-Source Contrib",
    ],
  },
  squads: {
    title: "Squads & Alliances",
    lines: [
      "GDG on Campus .... Community Lead",
      "College Tech Club . Core Member",
      "Open Source Guild . Contributor",
      "Dev Discord ....... Moderator",
    ],
  },
  contact: {
    title: "Contact Channels",
    lines: [
      "GITHUB    github.com/adrisha",
      "LINKEDIN  linkedin.com/in/adrisha",
      "EMAIL     adrisha@dev.com",
      "DISCORD   adrisha#0001",
    ],
  },
}

// Tighter pentagonal orbit
const ORBIT_R = 190

// --------------- CURSOR GLOW HOOK ---------------

function useCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      if (glowRef.current) glowRef.current.style.opacity = "1"

      idleTimerRef.current = setTimeout(() => {
        if (glowRef.current) glowRef.current.style.opacity = "0"
      }, 2000)
    }

    let rafId: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.09)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.09)

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(animate)
    }

    targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    currentRef.current = { ...targetRef.current }

    window.addEventListener("mousemove", handleMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [])

  return glowRef
}

// --------------- MAIN COMPONENT ---------------

interface TacticalViewProps {
  selectedRole: string
  onBack?: () => void
}

export function TacticalView({ selectedRole, onBack }: TacticalViewProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const { playClick } = useSound()
  const cursorGlowRef = useCursorGlow()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const handleIconClick = useCallback(
    (moduleId: string) => {
      playClick()
      setActivePanel((prev) => (prev === moduleId ? null : moduleId))
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
        opacity: Math.random() * 0.5 + 0.12,
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
        duration: `${Math.random() * 10 + 8}s`,
        delay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.2 + 0.06,
      })),
    []
  )

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0e" }}
    >
      {/* ============ CURSOR ENERGY GLOW ============ */}
      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{
          width: "340px",
          height: "340px",
          background:
            "radial-gradient(circle, rgba(200,45,45,0.14) 0%, rgba(160,30,30,0.06) 30%, transparent 60%)",
          filter: "blur(30px)",
          opacity: 0,
          transition: "opacity 1s ease-out",
          willChange: "transform, opacity",
        }}
      />

      {/* ============ BACKGROUND LAYERS ============ */}

      {/* Red nebula ambient */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(140,20,20,0.12) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 35% 55%, rgba(100,15,15,0.07) 0%, transparent 45%), radial-gradient(ellipse 40% 30% at 65% 45%, rgba(120,10,10,0.06) 0%, transparent 45%)",
          backgroundSize: "300% 300%",
          filter: "blur(70px)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,50,50,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(180,50,50,0.025) 1px, transparent 1px)",
          backgroundSize: "65px 65px",
        }}
      />

      {/* Scanning line */}
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(180,50,50,0.08) 20%, rgba(180,50,50,0.2) 50%, rgba(180,50,50,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 20px 3px rgba(180,50,50,0.05)",
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
            "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.8) 100%)",
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

      {/* ============ BACK BUTTON ============ */}
      {onBack && (
        <button
          onClick={handleBack}
          className={`group absolute left-6 top-6 z-50 flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 transition-all duration-500 hover:text-danger/80 sm:left-10 sm:top-8 ${
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
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
      )}

      {/* ============ IDENTITY BADGE ============ */}
      <div
        className={`absolute bottom-6 left-6 z-30 transition-all duration-700 delay-500 sm:bottom-8 sm:left-10 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-danger/40">
            Operator
          </p>
          <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-foreground/85 sm:text-base">
            Adrisha Biswas
          </h2>
          <p className="font-mono text-[8px] leading-relaxed tracking-wider text-muted-foreground/35 sm:text-[9px]">
            {"First-year B.Tech | Developer | Community Lead"}
          </p>
        </div>
      </div>

      {/* ============ CENTER: AVATAR + AURA + ICONS ============ */}
      <div
        className={`relative z-20 flex items-center justify-center transition-all duration-1000 ${
          mounted ? "scale-100 opacity-100" : "scale-[0.9] opacity-0"
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
            borderTopColor: "rgba(180,50,50,0.12)",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-loader-spin-reverse-slow pointer-events-none absolute rounded-full"
          style={{
            width: `${ORBIT_R * 2 + 30}px`,
            height: `${ORBIT_R * 2 + 30}px`,
            border: "1px dashed rgba(180,50,50,0.025)",
            borderBottomColor: "rgba(180,50,50,0.07)",
          }}
        />

        {/* Aura layer 1 -- wide diffuse */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse pointer-events-none absolute"
          style={{
            width: "380px",
            height: "520px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(160,30,30,0.18) 0%, rgba(120,15,15,0.06) 40%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        {/* Aura layer 2 -- core glow */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse-delayed pointer-events-none absolute"
          style={{
            width: "260px",
            height: "400px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(190,45,45,0.15) 0%, transparent 55%)",
            filter: "blur(35px)",
          }}
        />
        {/* Aura layer 3 -- tight rim */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse pointer-events-none absolute"
          style={{
            width: "180px",
            height: "310px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 55%, rgba(220,60,60,0.08) 0%, transparent 50%)",
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

        {/* Operator avatar -- dominant ~58vh tall with idle float */}
        <div
          className="animate-avatar-float relative"
          style={{ width: "clamp(280px, 40vw, 500px)", height: "58vh" }}
        >
          <Image
            src="/images/operator-avatar.png"
            alt="Operator avatar - Adrisha Biswas"
            fill
            className="object-contain drop-shadow-[0_0_60px_rgba(160,30,30,0.25)]"
            style={{ objectPosition: "center bottom" }}
            priority
          />
          {/* Floor glow */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3 left-1/2 h-6 w-40 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(180,40,40,0.22) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
        </div>

        {/* ============ PENTAGONAL TACTICAL ICONS ============ */}
        {MODULES.map((mod, i) => {
          const Icon = mod.icon
          const isHovered = hoveredIcon === mod.id
          const isActive = activePanel === mod.id

          const rad = ((mod.angle - 90) * Math.PI) / 180
          const x = Math.cos(rad) * ORBIT_R
          const y = Math.sin(rad) * ORBIT_R

          const panel = PANEL_CONTENT[mod.id]

          return (
            <div
              key={mod.id}
              className={`absolute transition-all duration-700 ${
                mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              style={{
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                transitionDelay: `${i * 120 + 300}ms`,
              }}
            >
              {/* Icon button */}
              <button
                onClick={() => handleIconClick(mod.id)}
                onMouseEnter={() => setHoveredIcon(mod.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0e] ${
                  isActive
                    ? "border-danger/60 bg-danger/[0.14] shadow-[0_0_35px_-4px] shadow-danger/40"
                    : isHovered
                      ? "border-danger/50 bg-danger/[0.1] shadow-[0_0_30px_-4px] shadow-danger/30"
                      : "border-danger/15 bg-[#0a0a0e]/60 hover:border-danger/40 hover:bg-danger/[0.06]"
                }`}
                aria-label={mod.label}
                aria-expanded={isActive}
              >
                <Icon
                  className={`h-6 w-6 transition-colors duration-300 ${
                    isActive
                      ? "text-danger"
                      : isHovered
                        ? "text-danger/90"
                        : "text-danger/40 group-hover:text-danger/70"
                  }`}
                />

                {/* Active ring indicator */}
                {isActive && (
                  <span
                    className="absolute inset-0 animate-ping rounded-full border border-danger/20"
                    style={{ animationDuration: "2s" }}
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* Hover label (only when NOT showing panel) */}
              {!isActive && (
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
              )}

              {/* ======= CONTEXTUAL INFO PANEL ======= */}
              <div
                className={`absolute top-1/2 z-50 -translate-y-1/2 transition-all duration-500 ${
                  mod.panelSide === "right" ? "left-[calc(100%+16px)]" : "right-[calc(100%+16px)]"
                } ${
                  isActive
                    ? "pointer-events-auto scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                }`}
              >
                <TacticalHudFrame
                  className="w-56"
                  glowIntensity={0.5}
                >
                  <div className="flex flex-col gap-3 p-4">
                    {/* Panel title */}
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-danger/20" />
                      <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-danger/60">
                        {panel?.title}
                      </span>
                      <div className="h-px flex-1 bg-danger/20" />
                    </div>

                    {/* Panel content lines */}
                    <div className="flex flex-col gap-1.5">
                      {panel?.lines.map((line, li) => (
                        <p
                          key={li}
                          className="font-mono text-[9px] leading-relaxed tracking-wide text-foreground/50"
                          style={{
                            animationDelay: `${li * 60}ms`,
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-danger/15 to-transparent" />
                  </div>
                </TacticalHudFrame>
              </div>
            </div>
          )
        })}
      </div>

      {/* ============ BOTTOM VERSION TAG ============ */}
      <div
        className={`absolute bottom-6 right-6 z-20 transition-all duration-700 delay-700 sm:bottom-8 sm:right-10 ${
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
