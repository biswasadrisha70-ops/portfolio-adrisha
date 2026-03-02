"use client"

import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import {
  User,
  Crosshair,
  FileText,
  Users,
  Radio,
  ChevronLeft,
  ChevronRight,
  Shield,
  Globe,
  Bot,
  Palette,
  UserCircle,
  Laptop,
  MessageCircle,
  Mail,
} from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { TacticalHudFrame } from "@/components/tactical-hud-frame"

// ===================== DATA =====================

interface TacticalModule {
  id: string
  label: string
  icon: React.ElementType
  angle: number
}

const MODULES: TacticalModule[] = [
  { id: "profile",   label: "Agent Profile",     icon: User,      angle: 270 },
  { id: "abilities", label: "Core Abilities",     icon: Crosshair, angle: 342 },
  { id: "missions",  label: "Mission Log",        icon: FileText,  angle: 54  },
  { id: "squads",    label: "Squads & Alliances", icon: Users,     angle: 126 },
  { id: "contact",   label: "Contact Channels",   icon: Radio,     angle: 198 },
]

// --- Perspective CSS per state (cinematic camera shifts) ---
const PERSPECTIVE_STYLES: Record<string, React.CSSProperties> = {
  default: {
    transform: "scale(1) translateX(0) translateY(0)",
    transformOrigin: "center center",
  },
  profile: {
    // Front-facing zoom into face/upper body
    transform: "scale(1.45) translateY(-12%)",
    transformOrigin: "50% 25%",
  },
  abilities: {
    // Left-side profile offset
    transform: "scale(1.35) translateX(22%) translateY(-8%)",
    transformOrigin: "30% 35%",
  },
  missions: {
    // Right-side profile offset
    transform: "scale(1.35) translateX(-22%) translateY(-8%)",
    transformOrigin: "70% 35%",
  },
  squads: {
    // Top-down / back of hood view
    transform: "scale(1.5) translateY(-18%)",
    transformOrigin: "50% 15%",
  },
  contact: {
    // Laptop-focused close-up
    transform: "scale(1.6) translateY(5%) translateX(-5%)",
    transformOrigin: "55% 55%",
  },
}

// --- Panel content for each module ---
interface PanelData {
  title: string
  items: { icon: React.ElementType; label: string; detail: string; badge?: string; badgeColor?: string }[]
}

const PANEL_CONTENT: Record<string, PanelData> = {
  profile: {
    title: "AGENT PROFILE",
    items: [
      { icon: User, label: "Adrisha Biswas", detail: "First-year B.Tech | Developer | Community Lead" },
      { icon: Shield, label: "Codename", detail: "PHANTOM" },
      { icon: Crosshair, label: "Specialization", detail: "Interface Engineering" },
      { icon: FileText, label: "Status", detail: "Active Deployment", badge: "ACTIVE", badgeColor: "text-green-400" },
    ],
  },
  abilities: {
    title: "CORE ABILITIES",
    items: [
      { icon: Laptop, label: "Frontend Development", detail: "(React, modern UI systems)" },
      { icon: Globe, label: "Backend & APIs", detail: "(Python, basic Node concepts)" },
      { icon: Bot, label: "AI / ML Exposure", detail: "(Computer vision, ML projects)" },
      { icon: Palette, label: "UI/UX Design & Interaction", detail: "(Interaction thinking)" },
      { icon: Users, label: "Community & Event Leadership", detail: "(Organizing, PR)" },
    ],
  },
  missions: {
    title: "MISSION LOG",
    items: [
      { icon: FileText, label: "Portfolio System v2.0", detail: "Full tactical interface rebuild", badge: "ACTIVE", badgeColor: "text-green-400" },
      { icon: FileText, label: "Community Platform Build", detail: "Discord + web integration", badge: "ACTIVE", badgeColor: "text-green-400" },
      { icon: FileText, label: "College Tech Fest Site", detail: "Led frontend team", badge: "COMPLETE", badgeColor: "text-muted-foreground" },
      { icon: FileText, label: "Discord Bot Framework", detail: "Moderation & utility bot", badge: "COMPLETE", badgeColor: "text-muted-foreground" },
      { icon: FileText, label: "Open-Source Contributions", detail: "Multiple repos", badge: "QUEUED", badgeColor: "text-yellow-500/70" },
    ],
  },
  squads: {
    title: "SQUADS & ALLIANCES",
    items: [
      { icon: Globe, label: "Google Developer Group On Campus", detail: "IIIT Kalyani - PR Lead" },
      { icon: Globe, label: "Open Source Connect Global", detail: "Campus Lead" },
      { icon: UserCircle, label: "IEEE IIIT Kalyani", detail: "Program Coordinator & PR" },
      { icon: MessageCircle, label: "Girls Who Yap", detail: "Ambassador" },
    ],
  },
  contact: {
    title: "CONTACT CHANNELS",
    items: [
      { icon: Shield, label: "Secure Comms", detail: "linkedin.com/in/adrisha", badge: "ACTIVE", badgeColor: "text-green-400" },
      { icon: Globe, label: "TechNet Node", detail: "github.com/adrisha", badge: "CONNECTED", badgeColor: "text-green-400" },
      { icon: Mail, label: "Encrypted Emails", detail: "adrisha@dev.com", badge: "2 UNREAD", badgeColor: "text-yellow-500/70" },
    ],
  },
}

// Pentagon orbit radius
const ORBIT_R = 200

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

// ===================== MAIN COMPONENT =====================

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

  // Navigate to prev/next module
  const navigate = useCallback(
    (direction: -1 | 1) => {
      playClick()
      const currentIdx = MODULES.findIndex((m) => m.id === activePanel)
      if (currentIdx === -1) return
      const nextIdx = (currentIdx + direction + MODULES.length) % MODULES.length
      setActivePanel(MODULES[nextIdx].id)
    },
    [activePanel, playClick]
  )

  // Aura drift particles
  const auraParticles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        angle: (360 / 22) * i + Math.random() * 12,
        distance: 50 + Math.random() * 140,
        size: Math.random() * 2.5 + 0.8,
        duration: `${Math.random() * 5 + 4}s`,
        delay: `${Math.random() * 4}s`,
        opacity: Math.random() * 0.5 + 0.15,
      })),
    []
  )

  // Background floating particles
  const bgParticles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.8 + 0.5,
        duration: `${Math.random() * 10 + 8}s`,
        delay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.2 + 0.06,
      })),
    []
  )

  // Current perspective style
  const perspectiveKey = activePanel ?? "default"
  const perspectiveStyle = PERSPECTIVE_STYLES[perspectiveKey] ?? PERSPECTIVE_STYLES.default

  // Panel position: left or right depending on active module
  const panelSide: "left" | "right" = (() => {
    if (!activePanel) return "left"
    const mod = MODULES.find((m) => m.id === activePanel)
    if (!mod) return "left"
    // If the angle is on the right side of the circle (roughly 300-90), panel goes left; otherwise right
    const a = mod.angle
    return a > 180 && a <= 360 ? "right" : "left"
  })()

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0b0b0f" }}
    >
      {/* ========== CURSOR GLOW ========== */}
      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, rgba(200,45,45,0.16) 0%, rgba(160,30,30,0.07) 30%, transparent 55%)",
          filter: "blur(25px)",
          opacity: 0,
          transition: "opacity 1s ease-out",
          willChange: "transform, opacity",
        }}
      />

      {/* ========== BACKGROUND LAYERS ========== */}

      {/* Red nebula ambient */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(140,20,20,0.14) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 35% 55%, rgba(100,15,15,0.08) 0%, transparent 45%), radial-gradient(ellipse 40% 30% at 65% 45%, rgba(120,10,10,0.07) 0%, transparent 45%)",
          backgroundSize: "300% 300%",
          filter: "blur(60px)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(180,50,50,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(180,50,50,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanning line */}
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(180,50,50,0.08) 20%, rgba(180,50,50,0.2) 50%, rgba(180,50,50,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 20px 3px rgba(180,50,50,0.05)",
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="animate-noise pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.85) 100%)",
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

      {/* ========== BACK BUTTON ========== */}
      {onBack && (
        <button
          onClick={handleBack}
          className={`group absolute left-6 top-6 z-50 flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 transition-all duration-500 hover:text-danger/80 sm:left-10 sm:top-8 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
          aria-label="Go back"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
      )}

      {/* ========== IDENTITY HUD (Top-Right) ========== */}
      <div
        className={`absolute right-6 top-6 z-50 transition-all duration-700 delay-300 sm:right-10 sm:top-8 ${mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
      >
        <TacticalHudFrame className="w-60 sm:w-72" glowIntensity={0.5}>
          <div className="flex flex-col gap-2.5 p-4">
            {/* Name */}
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground/90 sm:text-base">
              Adrisha Biswas
            </h2>
            {/* Tagline */}
            <p className="font-mono text-[8px] leading-relaxed tracking-wider text-danger/50 sm:text-[9px]">
              Frontend Developer | Community Builder | Learner
            </p>
            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-danger/30 via-danger/15 to-transparent" />
            {/* Health / Progress bar */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/50">
                {"Health | Progress"}
              </span>
              <div className="relative flex-1 h-2 overflow-hidden" style={{ clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)" }}>
                <div className="absolute inset-0 bg-[#1a1a22]" />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-danger/80 to-danger/50"
                  style={{ width: "50%", clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)" }}
                />
                {/* Leading edge glow */}
                <div
                  className="absolute inset-y-0"
                  style={{ left: "48%", width: "8px", background: "linear-gradient(90deg, rgba(255,80,80,0.6), transparent)", filter: "blur(3px)" }}
                />
              </div>
              <span className="font-mono text-[10px] font-bold tracking-wider text-danger/80">
                50%
              </span>
            </div>
          </div>
        </TacticalHudFrame>
      </div>

      {/* ========== CENTER STAGE: AVATAR + AURA + ICONS ========== */}
      <div
        className={`relative z-20 flex items-center justify-center transition-all duration-1000 ${mounted ? "scale-100 opacity-100" : "scale-[0.85] opacity-0"}`}
      >
        {/* Decorative HUD rings */}
        <div
          aria-hidden="true"
          className="animate-loader-spin-slow pointer-events-none absolute rounded-full"
          style={{
            width: `${ORBIT_R * 2 + 80}px`,
            height: `${ORBIT_R * 2 + 80}px`,
            border: "1px solid rgba(180,50,50,0.04)",
            borderTopColor: "rgba(180,50,50,0.12)",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-loader-spin-reverse-slow pointer-events-none absolute rounded-full"
          style={{
            width: `${ORBIT_R * 2 + 40}px`,
            height: `${ORBIT_R * 2 + 40}px`,
            border: "1px dashed rgba(180,50,50,0.025)",
            borderBottomColor: "rgba(180,50,50,0.07)",
          }}
        />

        {/* Aura layer 1 -- wide diffuse */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse pointer-events-none absolute"
          style={{
            width: "420px",
            height: "580px",
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(160,30,30,0.2) 0%, rgba(120,15,15,0.07) 40%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        {/* Aura layer 2 -- core */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse-delayed pointer-events-none absolute"
          style={{
            width: "280px",
            height: "440px",
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(190,45,45,0.16) 0%, transparent 55%)",
            filter: "blur(35px)",
          }}
        />
        {/* Aura layer 3 -- tight rim */}
        <div
          aria-hidden="true"
          className="animate-aura-pulse pointer-events-none absolute"
          style={{
            width: "200px",
            height: "350px",
            background: "radial-gradient(ellipse 100% 100% at 50% 55%, rgba(220,60,60,0.1) 0%, transparent 50%)",
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

        {/* ====== OPERATOR AVATAR with perspective shifts ====== */}
        <div
          className="animate-avatar-float relative overflow-hidden"
          style={{
            width: "clamp(320px, 45vw, 550px)",
            height: "65vh",
            ...perspectiveStyle,
            transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform-origin 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <Image
            src="/images/operator-avatar.png"
            alt="Operator avatar - Adrisha Biswas"
            fill
            className="object-contain drop-shadow-[0_0_60px_rgba(160,30,30,0.3)]"
            style={{ objectPosition: "center bottom" }}
            priority
          />
          {/* Floor glow */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3 left-1/2 h-8 w-48 -translate-x-1/2"
            style={{
              background: "radial-gradient(ellipse at center, rgba(180,40,40,0.25) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
        </div>

        {/* ====== PENTAGONAL TACTICAL ICONS ====== */}
        {MODULES.map((mod, i) => {
          const Icon = mod.icon
          const isHovered = hoveredIcon === mod.id
          const isActive = activePanel === mod.id
          const rad = ((mod.angle - 90) * Math.PI) / 180
          const x = Math.cos(rad) * ORBIT_R
          const y = Math.sin(rad) * ORBIT_R

          return (
            <div
              key={mod.id}
              className={`absolute z-30 transition-all duration-700 ${mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
              style={{
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                transitionDelay: `${i * 120 + 300}ms`,
              }}
            >
              {/* Pentagon-shaped icon container */}
              <button
                onClick={() => handleIconClick(mod.id)}
                onMouseEnter={() => setHoveredIcon(mod.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`group relative flex h-16 w-16 cursor-pointer items-center justify-center transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0f] ${
                  isActive
                    ? "shadow-[0_0_40px_-4px] shadow-danger/50"
                    : isHovered
                      ? "shadow-[0_0_30px_-4px] shadow-danger/30"
                      : ""
                }`}
                style={{
                  clipPath: "polygon(50% 0%, 97% 35%, 79% 91%, 21% 91%, 3% 35%)",
                  background: isActive
                    ? "rgba(180,50,50,0.18)"
                    : isHovered
                      ? "rgba(180,50,50,0.12)"
                      : "rgba(180,50,50,0.05)",
                }}
                aria-label={mod.label}
                aria-expanded={isActive}
              >
                <Icon
                  className={`h-6 w-6 transition-colors duration-300 ${
                    isActive ? "text-danger" : isHovered ? "text-danger/90" : "text-danger/45 group-hover:text-danger/70"
                  }`}
                />
              </button>

              {/* Pentagon border (SVG outline) */}
              <svg
                viewBox="0 0 64 64"
                fill="none"
                className="pointer-events-none absolute inset-0 h-16 w-16"
                aria-hidden="true"
              >
                <polygon
                  points="32,1 62,22.4 50.6,58.2 13.4,58.2 2,22.4"
                  stroke={isActive ? "rgba(180,50,50,0.7)" : isHovered ? "rgba(180,50,50,0.5)" : "rgba(180,50,50,0.2)"}
                  strokeWidth="1"
                  fill="none"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Active pulse ring */}
              {isActive && (
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  className="pointer-events-none absolute inset-0 h-16 w-16 animate-ping"
                  style={{ animationDuration: "2s" }}
                  aria-hidden="true"
                >
                  <polygon
                    points="32,1 62,22.4 50.6,58.2 13.4,58.2 2,22.4"
                    stroke="rgba(180,50,50,0.2)"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              )}

              {/* Hover label */}
              {!isActive && (
                <div
                  className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                    isHovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  }`}
                >
                  <span className="rounded border border-danger/10 bg-[#0b0b0f]/90 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.25em] text-danger/60 shadow-lg backdrop-blur-sm">
                    {mod.label}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ========== CONTENT PANEL (appears on icon click) ========== */}
      {activePanel && (
        <div
          className={`absolute z-40 transition-all duration-700 ease-out ${
            panelSide === "left"
              ? "left-6 sm:left-10"
              : "right-6 sm:right-10"
          }`}
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <div
            key={activePanel}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <TacticalHudFrame className="w-72 sm:w-80 md:w-96" glowIntensity={0.6}>
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-base font-bold uppercase tracking-[0.15em] text-foreground/90 sm:text-lg">
                    {PANEL_CONTENT[activePanel]?.title}
                  </h3>
                  <div className="h-px w-full bg-gradient-to-r from-danger/40 via-danger/15 to-transparent" />
                </div>

                {/* Items list */}
                <div className="flex flex-col gap-3">
                  {PANEL_CONTENT[activePanel]?.items.map((item, idx) => {
                    const ItemIcon = item.icon
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2"
                        style={{ animationDelay: `${idx * 80 + 100}ms`, animationFillMode: "both" }}
                      >
                        {/* Icon circle */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-danger/30 bg-danger/[0.08]">
                          <ItemIcon className="h-3.5 w-3.5 text-danger/70" />
                        </div>
                        {/* Text */}
                        <div className="flex flex-1 flex-col gap-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-danger/80 sm:text-xs">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={`shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.15em] ${item.badgeColor ?? "text-danger/60"}`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[8px] leading-relaxed tracking-wide text-muted-foreground/50 sm:text-[9px]">
                            {item.detail}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Bottom accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-danger/15 to-transparent" />
              </div>
            </TacticalHudFrame>
          </div>
        </div>
      )}

      {/* ========== NAVIGATION ARROWS (bottom center, when panel open) ========== */}
      {activePanel && (
        <div
          className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex h-10 w-12 cursor-pointer items-center justify-center border border-danger/25 bg-[#0b0b0f]/80 backdrop-blur-sm transition-all duration-300 hover:border-danger/50 hover:bg-danger/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40"
            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
            aria-label="Previous module"
          >
            <ChevronLeft className="h-4 w-4 text-danger/50 transition-colors group-hover:text-danger/90" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="group flex h-10 w-12 cursor-pointer items-center justify-center border border-danger/25 bg-[#0b0b0f]/80 backdrop-blur-sm transition-all duration-300 hover:border-danger/50 hover:bg-danger/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40"
            style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
            aria-label="Next module"
          >
            <ChevronRight className="h-4 w-4 text-danger/50 transition-colors group-hover:text-danger/90" />
          </button>
        </div>
      )}

      {/* ========== BOTTOM VERSION TAG ========== */}
      <div
        className={`absolute bottom-6 right-6 z-20 transition-all duration-700 delay-700 sm:bottom-8 sm:right-10 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/20">
          Tactical Command v2.0
        </p>
      </div>
    </div>
  )
}
