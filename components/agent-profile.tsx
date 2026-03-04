"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { SoundToggle } from "@/components/sound-toggle"
import { HelpButton } from "@/components/help-button"

// ===================== SEEDED RANDOM =====================

function seeded(i: number, offset = 0) {
  const x = Math.sin(i * 127.1 + offset * 311.7) * 43758.5453
  return x - Math.floor(x)
}

// ===================== PROFILE AURA ENGINE =====================

function ProfileAuraEngine() {
  const sparks = Array.from({ length: 18 }, (_, i) => {
    const angle = seeded(i, 40) * 360
    const distance = 60 + seeded(i, 41) * 120
    const rad = (angle * Math.PI) / 180
    const dx = Math.cos(rad) * distance
    const dy = Math.sin(rad) * distance - 50
    const duration = 2 + seeded(i, 42) * 2.5
    const delay = seeded(i, 43) * 4.5
    const startX = (seeded(i, 44) - 0.5) * 160
    const startY = (seeded(i, 45) - 0.5) * 280
    const size = 1.5 + seeded(i, 46) * 2

    return (
      <div
        key={`ps-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `calc(50% + ${startX}px)`,
          top: `calc(50% + ${startY}px)`,
          background: `radial-gradient(circle, rgba(255,${100 + Math.floor(seeded(i, 47) * 60)},${50 + Math.floor(seeded(i, 48) * 40)},1) 0%, rgba(200,40,40,0.6) 60%, transparent 100%)`,
          boxShadow: `0 0 ${3 + size}px rgba(255,80,50,0.7)`,
          animation: `spark-rise ${duration}s ease-out infinite`,
          animationDelay: `${delay}s`,
          ["--spark-dx" as string]: `${dx}px`,
          ["--spark-dy" as string]: `${dy}px`,
        }}
      />
    )
  })

  const blobs = Array.from({ length: 8 }, (_, i) => {
    const angle = seeded(i, 50) * 360
    const distance = 30 + seeded(i, 51) * 70
    const rad = (angle * Math.PI) / 180
    const dx = Math.cos(rad) * distance
    const dy = Math.sin(rad) * distance - 25
    const duration = 5 + seeded(i, 52) * 4
    const delay = seeded(i, 53) * 5
    const startX = (seeded(i, 54) - 0.5) * 100
    const startY = (seeded(i, 55) - 0.5) * 200
    const size = 12 + seeded(i, 56) * 22
    const blur = 8 + seeded(i, 57) * 12
    const peak = 0.18 + seeded(i, 58) * 0.3

    return (
      <div
        key={`pb-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `calc(50% + ${startX}px)`,
          top: `calc(50% + ${startY}px)`,
          background: `radial-gradient(circle, rgba(180,40,30,${peak}) 0%, rgba(140,20,20,0.1) 50%, transparent 100%)`,
          animation: `blob-drift ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          ["--blob-dx" as string]: `${dx}px`,
          ["--blob-dy" as string]: `${dy}px`,
          ["--blob-blur" as string]: `${blur}px`,
          ["--blob-peak" as string]: `${peak}`,
        }}
      />
    )
  })

  const embers = Array.from({ length: 12 }, (_, i) => {
    const angle = seeded(i, 60) * 360
    const distance = 50 + seeded(i, 61) * 130
    const rad = (angle * Math.PI) / 180
    const dx = Math.cos(rad) * distance
    const dy = Math.sin(rad) * distance - 60
    const duration = 2.5 + seeded(i, 62) * 3
    const delay = seeded(i, 63) * 5
    const startX = (seeded(i, 64) - 0.5) * 120
    const startY = (seeded(i, 65) - 0.5) * 240
    const size = 2 + seeded(i, 66) * 3

    return (
      <div
        key={`pe-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `calc(50% + ${startX}px)`,
          top: `calc(50% + ${startY}px)`,
          background: `rgba(255,${70 + Math.floor(seeded(i, 67) * 50)},30,0.9)`,
          boxShadow: `0 0 ${4 + size * 2}px rgba(200,50,30,0.5)`,
          animation: `ember-fade ${duration}s ease-out infinite`,
          animationDelay: `${delay}s`,
          ["--ember-dx" as string]: `${dx}px`,
          ["--ember-dy" as string]: `${dy}px`,
        }}
      />
    )
  })

  const waves = Array.from({ length: 3 }, (_, i) => {
    const size = 180 + i * 70
    const duration = 5 + i * 1.8
    const delay = i * 2

    return (
      <div
        key={`pw-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size * 1.3}px`,
          border: `1px solid rgba(180,50,40,${0.08 - i * 0.015})`,
          animation: `energy-wave ${duration}s ease-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    )
  })

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] flex items-end justify-end overflow-visible">
      {/* Wide outer glow */}
      <div
        className="absolute"
        style={{
          width: "700px",
          height: "800px",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 45%, rgba(150,25,25,0.22) 0%, rgba(120,15,15,0.06) 40%, transparent 65%)",
          filter: "blur(60px)",
          animation: "glow-breathe 7s ease-in-out infinite",
          ["--glow-min" as string]: "0.2",
          ["--glow-max" as string]: "0.35",
        }}
      />
      {/* Core heat */}
      <div
        className="absolute"
        style={{
          width: "400px",
          height: "600px",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 45%, rgba(200,45,35,0.18) 0%, rgba(160,25,25,0.04) 45%, transparent 60%)",
          filter: "blur(40px)",
          animation: "glow-breathe 9s ease-in-out 2s infinite",
          ["--glow-min" as string]: "0.15",
          ["--glow-max" as string]: "0.3",
        }}
      />
      {/* Edge rim light */}
      <div
        className="absolute"
        style={{
          width: "280px",
          height: "500px",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 48%, rgba(220,55,45,0.12) 0%, transparent 50%)",
          filter: "blur(22px)",
          animation: "glow-breathe 5.5s ease-in-out 1s infinite",
          ["--glow-min" as string]: "0.12",
          ["--glow-max" as string]: "0.24",
        }}
      />

      {waves}
      {blobs}
      {embers}
      {sparks}
    </div>
  )
}

// ===================== MAIN COMPONENT =====================

interface AgentProfileProps {
  /** Return to the tactical hub */
  onBack: () => void
  /** Navigate to the previous module (Contact Channels) */
  onPrev?: () => void
  /** Navigate to the next module (Core Abilities) */
  onNext?: () => void
  /** Source mode: "tactical" shows bottom nav, "battle" hides it */
  source?: "tactical" | "battle"
}

export function AgentProfile({ onBack, onPrev, onNext, source = "tactical" }: AgentProfileProps) {
  const [mounted, setMounted] = useState(false)
  const { playClick } = useSound()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const handleBack = useCallback(() => {
    playClick()
    onBack()
  }, [playClick, onBack])

  const handlePrev = useCallback(() => {
    playClick()
    onPrev?.()
  }, [playClick, onPrev])

  const handleNext = useCallback(() => {
    playClick()
    onNext?.()
  }, [playClick, onNext])

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* ====== BG LAYERS (same cinematic base) ====== */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(140,20,20,0.14) 0%, transparent 60%), radial-gradient(ellipse 35% 30% at 70% 40%, rgba(100,15,15,0.08) 0%, transparent 50%)",
          backgroundSize: "300% 300%",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,50,50,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(180,50,50,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(180,50,50,0.06) 20%, rgba(180,50,50,0.15) 50%, rgba(180,50,50,0.06) 80%, transparent 100%)",
          boxShadow: "0 0 20px 3px rgba(180,50,50,0.04)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* ====== SPLIT LAYOUT: Text left ~42%, Avatar right ~58% ====== */}
      <div className="relative z-20 flex h-full w-full max-w-[1400px] items-center px-6 sm:px-10 md:px-14 lg:px-20">

        {/* ---- LEFT: INFO PANEL ---- */}
        <div
          className={`relative z-30 flex w-[42%] max-w-xl flex-col justify-center pr-8 transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            mounted ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          {/* Angular HUD panel */}
          <div
            className="relative overflow-hidden border border-danger/20 bg-[#0a0a0f]/80 backdrop-blur-md"
            style={{
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
            }}
          >
            {/* Corner accents */}
            <div className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-danger/50 to-transparent" />
            <div className="absolute left-0 top-0 h-px w-10 bg-gradient-to-r from-danger/50 to-transparent" />
            <div className="absolute bottom-0 right-0 h-10 w-px bg-gradient-to-t from-danger/50 to-transparent" />
            <div className="absolute bottom-0 right-0 h-px w-10 bg-gradient-to-l from-danger/50 to-transparent" />
            {/* Top red border accent */}
            <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-danger/25 to-transparent" />
            {/* Bottom border accent */}
            <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-danger/15 to-transparent" />

            {/* Inner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 70% 50% at 30% 30%, rgba(180,40,40,0.04) 0%, transparent 70%)",
              }}
            />

            <div className="relative px-8 py-8 sm:px-10 sm:py-10">
              {/* Title */}
              <h1 className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-foreground/80 sm:text-base md:text-lg">
                Agent Profile
              </h1>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-danger/40 via-danger/15 to-transparent" />

              {/* Name */}
              <h2 className="mt-6 font-mono text-xl font-bold uppercase tracking-[0.15em] text-danger sm:text-2xl md:text-3xl">
                Adrisha Biswas
              </h2>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-foreground/35 sm:text-[11px]">
                {"First-year B.Tech | Developer | Community Lead"}
              </p>

              {/* Divider */}
              <div className="mt-6 h-px w-3/4 bg-gradient-to-r from-danger/25 to-transparent" />

              {/* Description */}
              <p className="mt-6 font-mono text-[11px] leading-[1.8] tracking-wide text-foreground/45 sm:text-xs md:text-[13px]">
                Passionate about building clean interfaces, learning scalable systems, and growing through hands-on projects and community leadership.
              </p>
            </div>
          </div>
        </div>

        {/* ---- RIGHT: CHARACTER WITH AURA ---- */}
        <div
          className={`relative flex h-full flex-1 items-end justify-end overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            mounted ? "translate-x-0 scale-100 opacity-100" : "translate-x-12 scale-[0.92] opacity-0"
          }`}
        >
          {/* Aura engine behind character */}
          <ProfileAuraEngine />

          {/* Character avatar */}
          <div
            className="animate-avatar-float relative z-[10]"
            style={{
              height: "110vh",
              width: "auto",
              transform: "translateX(5%)",
            }}
          >
            <Image
              src="/images/profile-avatar.png"
              alt="Agent profile -- front-facing operator portrait"
              width={600}
              height={900}
              className="h-full w-auto object-contain drop-shadow-[0_0_80px_rgba(160,30,30,0.35)]"
              style={{ objectPosition: "bottom right" }}
              priority
            />
            {/* Floor glow */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 left-1/2 h-8 w-64 -translate-x-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(180,40,40,0.35) 0%, transparent 70%)",
                filter: "blur(16px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ====== BACK BUTTON (Top-left) ====== */}
      <button
        onClick={handleBack}
        className={`group fixed left-5 top-6 z-[100] flex cursor-pointer items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] transition-all duration-500 sm:left-8 sm:top-7 ${
          mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
        style={{
          color: "rgba(220,60,60,0.7)",
          textShadow: "0 0 8px rgba(200,40,40,0.45)",
        }}
        aria-label="Back to tactical hub"
      >
        <span className="inline-block h-px w-4 bg-current transition-all duration-300 group-hover:w-6" style={{ filter: "drop-shadow(0 0 4px rgba(200,40,40,0.5))" }} />
        <span className="transition-colors duration-300 group-hover:text-[rgba(220,60,60,1)]">Back</span>
      </button>

      {/* ====== TOP-RIGHT: Sound + Help ====== */}
      <div
        className={`fixed right-5 top-6 z-[100] flex items-center gap-3 sm:right-8 sm:top-7 transition-all duration-700 ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <SoundToggle position="inline" />
        <HelpButton />
      </div>

      {/* ====== BOTTOM NAV ARROWS (hidden in Battle Mode) ====== */}
      {source !== "battle" && <div
        className={`fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-4 transition-all duration-700 delay-500 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {/* Left arrow -- to Contact Channels */}
        <button
          onClick={handlePrev}
          className="group flex cursor-pointer items-center justify-center border border-danger/20 bg-[#0a0a0f]/70 p-3 backdrop-blur-sm transition-all duration-400 hover:border-danger/40 hover:bg-danger/[0.06]"
          style={{
            clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
          }}
          aria-label="Navigate to Contact Channels"
        >
          <ChevronLeft className="h-5 w-5 text-danger/40 transition-all duration-300 group-hover:text-danger/70 group-hover:-translate-x-0.5" />
        </button>

        {/* Right arrow -- to Core Abilities */}
        <button
          onClick={handleNext}
          className="group flex cursor-pointer items-center justify-center border border-danger/20 bg-[#0a0a0f]/70 p-3 backdrop-blur-sm transition-all duration-400 hover:border-danger/40 hover:bg-danger/[0.06]"
          style={{
            clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
          }}
          aria-label="Navigate to Core Abilities"
        >
          <ChevronRight className="h-5 w-5 text-danger/40 transition-all duration-300 group-hover:text-danger/70 group-hover:translate-x-0.5" />
      </button>
      </div>}
      
      {/* ====== BOTTOM VERSION TAG ====== */}
      <div
        className={`fixed bottom-5 right-5 z-20 transition-all duration-700 delay-700 sm:bottom-7 sm:right-8 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/20">
          Agent Profile v1.0
        </p>
      </div>
    </div>
  )
}
