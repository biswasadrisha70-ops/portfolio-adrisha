"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { User, Crosshair, FileText, Users, Radio } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { SoundToggle } from "@/components/sound-toggle"
import { TacticalHudFrame } from "@/components/tactical-hud-frame"

// ===================== DATA =====================

interface TacticalModule {
  id: string
  label: string
  icon: React.ElementType
  /** Angle in degrees (0 = top, clockwise) */
  angle: number
}

const MODULES: TacticalModule[] = [
  { id: "profile",   label: "Agent Profile",     icon: User,      angle: 270 },  // top-center (12 o'clock)
  { id: "abilities", label: "Core Abilities",     icon: Crosshair, angle: 342 },  // upper-right (~2 o'clock)
  { id: "missions",  label: "Mission Log",        icon: FileText,  angle: 54  },  // lower-right (~4 o'clock)
  { id: "squads",    label: "Squads & Alliances", icon: Users,     angle: 126 },  // lower-left  (~8 o'clock)
  { id: "contact",   label: "Contact Channels",   icon: Radio,     angle: 198 },  // upper-left  (~10 o'clock)
]

// Orbit radius scaled to ~65% from center; bumped up for larger avatar
const ORBIT_RADIUS = 280

// ===================== CURSOR GLOW HOOK =====================

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
      }, 2500)
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

// ===================== MAIN COMPONENT =====================

interface TacticalViewProps {
  selectedRole: string
  onBack?: () => void
}

export function TacticalView({ selectedRole, onBack }: TacticalViewProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const { playClick } = useSound()
  const cursorGlowRef = useCursorGlow()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const handleIconClick = useCallback(
    (moduleId: string) => {
      playClick()
      // Placeholder: will navigate to module pages in a future step
    },
    [playClick]
  )

  const handleBack = useCallback(() => {
    playClick()
    onBack?.()
  }, [playClick, onBack])

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* ========== CURSOR GLOW ========== */}
      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{
          width: "340px",
          height: "340px",
          background:
            "radial-gradient(circle, rgba(200,45,45,0.15) 0%, rgba(160,30,30,0.06) 35%, transparent 60%)",
          filter: "blur(25px)",
          opacity: 0,
          transition: "opacity 1.2s ease-out",
          willChange: "transform, opacity",
        }}
      />

      {/* ========== BACKGROUND LAYERS ========== */}

      {/* Red nebula ambient */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(140,20,20,0.12) 0%, transparent 60%), radial-gradient(ellipse 35% 30% at 30% 60%, rgba(100,15,15,0.06) 0%, transparent 50%)",
          backgroundSize: "300% 300%",
          filter: "blur(60px)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,50,50,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(180,50,50,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanning line */}
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(180,50,50,0.06) 20%, rgba(180,50,50,0.15) 50%, rgba(180,50,50,0.06) 80%, transparent 100%)",
          boxShadow: "0 0 20px 3px rgba(180,50,50,0.04)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* ========== SOUND TOGGLE (Top-Left) ========== */}
      <div
        className={`fixed left-5 top-5 z-[95] transition-all duration-700 delay-200 sm:left-8 sm:top-7 ${
          mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
      >
        <SoundToggle position="top-left" />
      </div>

      {/* ========== BACK BUTTON (Below Sound Toggle) ========== */}
      {onBack && (
        <button
          onClick={handleBack}
          className={`group fixed left-5 top-[68px] z-[95] flex cursor-pointer items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/40 transition-all duration-500 hover:text-danger/70 sm:left-8 sm:top-[72px] ${
            mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
          aria-label="Go back to mode select"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1"
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

      {/* ========== IDENTITY HUD (Top-Right) ========== */}
      <div
        className={`fixed right-5 top-5 z-[95] transition-all duration-700 delay-300 sm:right-8 sm:top-7 ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <TacticalHudFrame className="w-[260px] sm:w-[290px]" glowIntensity={0.5}>
          <div className="flex flex-col gap-2.5 p-4">
            {/* Name */}
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground/90 sm:text-[15px]">
              Adrisha Biswas
            </h2>
            {/* Tagline */}
            <p className="font-mono text-[8px] leading-relaxed tracking-wider text-danger/50 sm:text-[9px]">
              Frontend Developer | Community Builder | Learner
            </p>
            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-danger/30 via-danger/15 to-transparent" />
            {/* Health / Progress */}
            <div className="flex items-center gap-3">
              <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.2em] text-muted-foreground/40 sm:text-[8px]">
                {"Health | Progress"}
              </span>
              <div
                className="relative h-2.5 flex-1 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
                }}
              >
                {/* Track */}
                <div className="absolute inset-0 bg-[#1a1a22]" />
                {/* Fill */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-danger/80 to-danger/60"
                  style={{
                    width: "50%",
                    clipPath:
                      "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
                  }}
                />
                {/* Leading glow */}
                <div
                  className="absolute inset-y-0"
                  style={{
                    left: "48%",
                    width: "10px",
                    background:
                      "linear-gradient(90deg, rgba(255,80,80,0.7), transparent)",
                    filter: "blur(3px)",
                  }}
                />
              </div>
              <span className="shrink-0 font-mono text-[10px] font-bold tracking-wider text-danger/80 sm:text-[11px]">
                50%
              </span>
            </div>
          </div>
        </TacticalHudFrame>
      </div>

      {/* ========== CENTER STAGE ========== */}
      <div
        className={`relative z-20 flex items-center justify-center transition-all duration-1000 ${
          mounted ? "scale-100 opacity-100" : "scale-[0.85] opacity-0"
        }`}
      >
        {/* Decorative HUD ring (slightly larger than icon orbit) */}
        <div
          aria-hidden="true"
          className="animate-loader-spin-slow pointer-events-none absolute rounded-full"
          style={{
            width: `${ORBIT_RADIUS * 2 + 100}px`,
            height: `${ORBIT_RADIUS * 2 + 100}px`,
            border: "1px solid rgba(180,50,50,0.035)",
            borderTopColor: "rgba(180,50,50,0.1)",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-loader-spin-reverse-slow pointer-events-none absolute rounded-full"
          style={{
            width: `${ORBIT_RADIUS * 2 + 50}px`,
            height: `${ORBIT_RADIUS * 2 + 50}px`,
            border: "1px dashed rgba(180,50,50,0.02)",
            borderBottomColor: "rgba(180,50,50,0.06)",
          }}
        />

        {/* ====== AURA (soft red glow only) ====== */}
        {/* Wide diffuse layer */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse pointer-events-none absolute"
          style={{
            width: "600px",
            height: "780px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(150,25,25,0.18) 0%, rgba(120,15,15,0.06) 40%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* Core layer */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse-delayed pointer-events-none absolute"
          style={{
            width: "420px",
            height: "640px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(180,40,40,0.14) 0%, transparent 55%)",
            filter: "blur(45px)",
          }}
        />
        {/* Tight rim layer */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse pointer-events-none absolute"
          style={{
            width: "300px",
            height: "520px",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 55%, rgba(200,50,50,0.08) 0%, transparent 50%)",
            filter: "blur(28px)",
            animationDelay: "0.8s",
          }}
        />

        {/* ====== OPERATOR AVATAR ====== */}
        <div
          className="animate-avatar-float relative"
          style={{
            width: "clamp(380px, 48vw, 640px)",
            height: "67vh",
          }}
        >
          <Image
            src="/images/operator-avatar.png"
            alt="Operator avatar - tactical command character"
            fill
            className="object-contain drop-shadow-[0_0_60px_rgba(160,30,30,0.3)]"
            style={{ objectPosition: "center bottom" }}
            priority
          />
          {/* Floor glow */}
          <div
            aria-hidden="true"
            className="absolute -bottom-6 left-1/2 h-10 w-72 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(180,40,40,0.3) 0%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />
        </div>

        {/* ====== PENTAGONAL TACTICAL ICONS ====== */}
        {MODULES.map((mod, i) => {
          const Icon = mod.icon
          const isHovered = hoveredIcon === mod.id
          // Convert angle to radians (CSS 0° = right, so subtract 90 to make 0° = top)
          const rad = (mod.angle * Math.PI) / 180
          const x = Math.cos(rad) * ORBIT_RADIUS
          const y = Math.sin(rad) * ORBIT_RADIUS

          return (
            <div
              key={mod.id}
              className={`absolute z-30 transition-all duration-700 ${
                mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              style={{
                // Offset by half the icon size (40px) so the icon center sits exactly on the orbit point
                transform: `translate(${x - 40}px, ${y - 40}px)`,
                transitionDelay: `${i * 120 + 400}ms`,
              }}
            >
              {/* Pentagon-shaped button -- 80px */}
              <button
                onClick={() => handleIconClick(mod.id)}
                onMouseEnter={() => setHoveredIcon(mod.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`group relative flex h-20 w-20 cursor-pointer items-center justify-center transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] ${
                  isHovered
                    ? "shadow-[0_0_35px_-4px] shadow-danger/35"
                    : ""
                }`}
                style={{
                  clipPath:
                    "polygon(50% 0%, 97% 35%, 79% 91%, 21% 91%, 3% 35%)",
                  background: isHovered
                    ? "rgba(180,50,50,0.14)"
                    : "rgba(180,50,50,0.05)",
                }}
                aria-label={mod.label}
              >
                <Icon
                  className={`h-7 w-7 transition-colors duration-300 ${
                    isHovered
                      ? "text-danger"
                      : "text-danger/40 group-hover:text-danger/70"
                  }`}
                />
              </button>

              {/* Pentagon border (SVG) */}
              <svg
                viewBox="0 0 80 80"
                fill="none"
                className="pointer-events-none absolute inset-0 h-20 w-20"
                aria-hidden="true"
              >
                <polygon
                  points="40,1.5 77.6,28 68.8,72.8 11.2,72.8 2.4,28"
                  stroke={
                    isHovered
                      ? "rgba(180,50,50,0.55)"
                      : "rgba(180,50,50,0.18)"
                  }
                  strokeWidth="1"
                  fill="none"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Hover label */}
              <div
                className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                  isHovered
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
              >
                <span className="rounded border border-danger/10 bg-[#0a0a0f]/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-danger/60 shadow-lg backdrop-blur-sm">
                  {mod.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ========== BOTTOM VERSION TAG ========== */}
      <div
        className={`fixed bottom-5 right-5 z-20 transition-all duration-700 delay-700 sm:bottom-7 sm:right-8 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/20">
          Tactical Command v3.0
        </p>
      </div>
    </div>
  )
}
