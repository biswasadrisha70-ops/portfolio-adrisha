"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowLeft, Mail, Github, Linkedin } from "lucide-react"
import { useSound } from "@/hooks/use-sound"
import { SoundToggle } from "@/components/sound-toggle"
import { HelpButton } from "@/components/help-button"

// ===================== SEEDED RANDOM =====================

function seeded(i: number, offset = 0) {
  const x = Math.sin(i * 127.1 + offset * 311.7) * 43758.5453
  return x - Math.floor(x)
}

// ===================== CONTACT AURA ENGINE =====================

function ContactAuraEngine() {
  // Sparks - small bright dots flying outward
  const sparks = Array.from({ length: 24 }, (_, i) => {
    const angle = seeded(i, 200) * 360
    const distance = 70 + seeded(i, 201) * 140
    const rad = (angle * Math.PI) / 180
    const dx = Math.cos(rad) * distance
    const dy = Math.sin(rad) * distance - 55
    const duration = 1.8 + seeded(i, 202) * 2.8
    const delay = seeded(i, 203) * 5
    const startX = (seeded(i, 204) - 0.5) * 180
    const startY = (seeded(i, 205) - 0.5) * 320
    const size = 1.5 + seeded(i, 206) * 2.5

    return (
      <div
        key={`cs-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `calc(50% + ${startX}px)`,
          top: `calc(50% + ${startY}px)`,
          background: `radial-gradient(circle, rgba(255,${90 + Math.floor(seeded(i, 207) * 70)},${40 + Math.floor(seeded(i, 208) * 50)},1) 0%, rgba(220,50,40,0.6) 60%, transparent 100%)`,
          boxShadow: `0 0 ${4 + size}px rgba(255,70,40,0.8)`,
          animation: `spark-rise ${duration}s ease-out infinite`,
          animationDelay: `${delay}s`,
          ["--spark-dx" as string]: `${dx}px`,
          ["--spark-dy" as string]: `${dy}px`,
        }}
      />
    )
  })

  // Particle blobs - soft, large, drifting
  const blobs = Array.from({ length: 10 }, (_, i) => {
    const angle = seeded(i, 210) * 360
    const distance = 35 + seeded(i, 211) * 80
    const rad = (angle * Math.PI) / 180
    const dx = Math.cos(rad) * distance
    const dy = Math.sin(rad) * distance - 30
    const duration = 4.5 + seeded(i, 212) * 4.5
    const delay = seeded(i, 213) * 5.5
    const startX = (seeded(i, 214) - 0.5) * 120
    const startY = (seeded(i, 215) - 0.5) * 240
    const size = 14 + seeded(i, 216) * 26
    const blur = 10 + seeded(i, 217) * 14
    const peak = 0.2 + seeded(i, 218) * 0.35

    return (
      <div
        key={`cb-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `calc(50% + ${startX}px)`,
          top: `calc(50% + ${startY}px)`,
          background: `radial-gradient(circle, rgba(200,45,35,${peak}) 0%, rgba(160,25,20,0.1) 50%, transparent 100%)`,
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

  // Embers - medium bright, fade to nothing
  const embers = Array.from({ length: 16 }, (_, i) => {
    const angle = seeded(i, 220) * 360
    const distance = 55 + seeded(i, 221) * 150
    const rad = (angle * Math.PI) / 180
    const dx = Math.cos(rad) * distance
    const dy = Math.sin(rad) * distance - 65
    const duration = 2.2 + seeded(i, 222) * 3.2
    const delay = seeded(i, 223) * 5.5
    const startX = (seeded(i, 224) - 0.5) * 140
    const startY = (seeded(i, 225) - 0.5) * 280
    const size = 2 + seeded(i, 226) * 3.5

    return (
      <div
        key={`ce-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `calc(50% + ${startX}px)`,
          top: `calc(50% + ${startY}px)`,
          background: `rgba(255,${65 + Math.floor(seeded(i, 227) * 55)},25,0.95)`,
          boxShadow: `0 0 ${5 + size * 2}px rgba(220,55,35,0.6)`,
          animation: `ember-fade ${duration}s ease-out infinite`,
          animationDelay: `${delay}s`,
          ["--ember-dx" as string]: `${dx}px`,
          ["--ember-dy" as string]: `${dy}px`,
        }}
      />
    )
  })

  // Energy waves - concentric rings expanding outward
  const waves = Array.from({ length: 4 }, (_, i) => {
    const size = 160 + i * 65
    const duration = 4.5 + i * 1.6
    const delay = i * 1.8

    return (
      <div
        key={`cw-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size * 1.35}px`,
          border: `1px solid rgba(200,55,45,${0.1 - i * 0.018})`,
          animation: `energy-wave ${duration}s ease-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    )
  })

  // Heat distortion shimmer layers
  const shimmerLayers = Array.from({ length: 3 }, (_, i) => {
    const size = 300 + i * 100
    const duration = 3 + i * 0.8
    const delay = i * 0.6

    return (
      <div
        key={`csh-${i}`}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size * 1.4}px`,
          background: `radial-gradient(ellipse, rgba(255,80,50,${0.03 - i * 0.008}) 0%, transparent 70%)`,
          filter: `blur(${20 + i * 8}px)`,
          animation: `glow-breathe ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          ["--glow-min" as string]: `${0.02 - i * 0.005}`,
          ["--glow-max" as string]: `${0.06 - i * 0.01}`,
        }}
      />
    )
  })

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] flex items-end justify-end overflow-visible">
      {/* Wide outer glow - intensified */}
      <div
        className="absolute"
        style={{
          width: "750px",
          height: "880px",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 45%, rgba(180,35,30,0.28) 0%, rgba(140,20,18,0.08) 40%, transparent 65%)",
          filter: "blur(65px)",
          animation: "glow-breathe 6s ease-in-out infinite",
          ["--glow-min" as string]: "0.25",
          ["--glow-max" as string]: "0.42",
        }}
      />
      {/* Core heat layer */}
      <div
        className="absolute"
        style={{
          width: "450px",
          height: "680px",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 45%, rgba(220,55,45,0.22) 0%, rgba(180,30,28,0.05) 45%, transparent 60%)",
          filter: "blur(45px)",
          animation: "glow-breathe 8s ease-in-out 2s infinite",
          ["--glow-min" as string]: "0.18",
          ["--glow-max" as string]: "0.35",
        }}
      />
      {/* Edge rim light - character outline glow */}
      <div
        className="absolute"
        style={{
          width: "320px",
          height: "560px",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 48%, rgba(255,70,55,0.16) 0%, transparent 50%)",
          filter: "blur(26px)",
          animation: "glow-breathe 5s ease-in-out 1s infinite",
          ["--glow-min" as string]: "0.14",
          ["--glow-max" as string]: "0.28",
        }}
      />

      {shimmerLayers}
      {waves}
      {blobs}
      {embers}
      {sparks}
    </div>
  )
}

// ===================== CONTACT ITEM =====================

interface ContactItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  delay: number
  mounted: boolean
}

function ContactItem({ icon, label, value, href, delay, mounted }: ContactItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 py-4 transition-all duration-500 hover:translate-x-1 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-danger/20 bg-danger/[0.04] transition-all duration-300 group-hover:border-danger/40 group-hover:bg-danger/[0.08] group-hover:shadow-[0_0_20px_rgba(200,50,45,0.15)]">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
          {label}
        </span>
        <span className="font-mono text-xs tracking-wide text-danger/70 transition-colors duration-300 group-hover:text-danger sm:text-sm">
          {value}
        </span>
      </div>
      <span className="ml-auto inline-block h-px w-0 bg-danger/40 transition-all duration-300 group-hover:w-8" />
    </a>
  )
}

// ===================== MAIN COMPONENT =====================

interface ContactChannelsProps {
  /** Navigate to Squads & Alliances (left arrow) */
  onPrev?: () => void
  /** Navigate to Profile (right arrow) */
  onNext?: () => void
  /** Return to Tactical Hub */
  onBack?: () => void
  /** Source mode: "tactical" shows bottom nav, "battle" hides it */
  source?: "tactical" | "battle"
}

export function ContactChannels({ onPrev, onNext, onBack, source = "tactical" }: ContactChannelsProps) {
  const [mounted, setMounted] = useState(false)
  const { playClick } = useSound()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const handlePrev = useCallback(() => {
    playClick()
    onPrev?.()
  }, [playClick, onPrev])

  const handleNext = useCallback(() => {
    playClick()
    onNext?.()
  }, [playClick, onNext])

  const handleBack = useCallback(() => {
    playClick()
    onBack?.()
  }, [playClick, onBack])

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* ====== BG LAYERS ====== */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(160,25,22,0.16) 0%, transparent 60%), radial-gradient(ellipse 35% 30% at 30% 40%, rgba(120,18,18,0.1) 0%, transparent 50%)",
          backgroundSize: "300% 300%",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,55,50,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,55,50,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(200,55,50,0.08) 20%, rgba(200,55,50,0.18) 50%, rgba(200,55,50,0.08) 80%, transparent 100%)",
          boxShadow: "0 0 24px 4px rgba(200,55,50,0.05)",
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

        {/* ---- LEFT: CONTACT INFO PANEL ---- */}
        <div
          className={`relative z-30 flex w-[42%] max-w-xl flex-col justify-center pr-8 transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${mounted ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
        >
          {/* Angular HUD panel */}
          <div
            className="relative overflow-hidden border border-danger/25 bg-[#0a0a0f]/85 backdrop-blur-md"
            style={{
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
            }}
          >
            {/* Corner accents */}
            <div className="absolute left-0 top-0 h-12 w-px bg-gradient-to-b from-danger/60 to-transparent" />
            <div className="absolute left-0 top-0 h-px w-12 bg-gradient-to-r from-danger/60 to-transparent" />
            <div className="absolute bottom-0 right-0 h-12 w-px bg-gradient-to-t from-danger/60 to-transparent" />
            <div className="absolute bottom-0 right-0 h-px w-12 bg-gradient-to-l from-danger/60 to-transparent" />
            <div className="absolute left-12 right-12 top-0 h-px bg-gradient-to-r from-transparent via-danger/30 to-transparent" />
            <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-danger/18 to-transparent" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 70% 50% at 30% 30%, rgba(200,45,40,0.05) 0%, transparent 70%)",
              }}
            />

            <div className="relative px-8 py-8 sm:px-10 sm:py-10">
              {/* Title */}
              <h1 className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-foreground/85 sm:text-base md:text-lg">
                Contact Channels
              </h1>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-danger/45 via-danger/18 to-transparent" />

              {/* Tagline */}
              <p
                className={`mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-danger/50 transition-all duration-700 sm:text-[11px] ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                style={{ transitionDelay: "350ms" }}
              >
                Establish Secure Connection
              </p>

              {/* Divider */}
              <div
                className={`mt-5 h-px w-2/3 bg-gradient-to-r from-danger/30 to-transparent transition-all duration-700 ${mounted ? "w-2/3 opacity-100" : "w-0 opacity-0"
                  }`}
                style={{ transitionDelay: "450ms" }}
              />

              {/* Contact Items */}
              <div className="mt-6 flex flex-col">
                <ContactItem
                  icon={<Mail className="h-4 w-4 text-danger/50 transition-colors group-hover:text-danger/80" />}
                  label="Email"
                  value="biswasadrisha70@gmail.com"
                  href="mailto:biswasadrisha70@gmail.com"
                  delay={550}
                  mounted={mounted}
                />

                <div className="h-px w-full bg-gradient-to-r from-danger/15 via-danger/8 to-transparent" />

                <ContactItem
                  icon={<Github className="h-4 w-4 text-danger/50 transition-colors group-hover:text-danger/80" />}
                  label="GitHub"
                  value="github.com/Adrisha-01"
                  href="https://github.com/biswasadrisha70-ops"
                  delay={650}
                  mounted={mounted}
                />

                <div className="h-px w-full bg-gradient-to-r from-danger/15 via-danger/8 to-transparent" />

                <ContactItem
                  icon={<Linkedin className="h-4 w-4 text-danger/50 transition-colors group-hover:text-danger/80" />}
                  label="LinkedIn"
                  value="linkedin.com/in/adrisha-biswas"
                  href="https://www.linkedin.com/in/adrisha-biswas/"
                  delay={750}
                  mounted={mounted}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---- RIGHT: CHARACTER WITH AURA ---- */}
        <div
          className={`relative flex h-full flex-1 items-end justify-end overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${mounted ? "translate-x-0 scale-100 opacity-100" : "translate-x-12 scale-[0.92] opacity-0"
            }`}
          style={{ background: "transparent" }}
        >
          <ContactAuraEngine />

          <div
            className="animate-avatar-float relative z-[10]"
            style={{
              height: "110vh",
              width: "auto",
              transform: "translateX(5%)",
              background: "transparent",
            }}
          >
            <Image
              src="/images/contact-avatar.png"
              alt="Operator typing on laptop -- Contact Channels view"
              width={600}
              height={900}
              unoptimized
              className="h-full w-auto object-contain drop-shadow-[0_0_90px_rgba(180,40,35,0.4)]"
              style={{
                objectPosition: "bottom right",
              }}
              priority
            />
            {/* Floor glow */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 left-1/2 h-10 w-72 -translate-x-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(200,50,45,0.4) 0%, transparent 70%)",
                filter: "blur(18px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ====== BACK BUTTON (Top-left, red glow) ====== */}
      <button
        onClick={handleBack}
        className={`group fixed left-5 top-6 z-[100] flex cursor-pointer items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] transition-all duration-500 sm:left-8 sm:top-7 ${mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
        style={{
          color: "rgba(220,60,60,0.7)",
          textShadow: "0 0 8px rgba(200,40,40,0.45)",
        }}
        aria-label="Back to tactical hub"
      >
        <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" style={{ filter: "drop-shadow(0 0 4px rgba(200,40,40,0.5))" }} />
        <span className="transition-colors duration-300 group-hover:text-[rgba(220,60,60,1)]">Back</span>
      </button>

      {/* ====== TOP-RIGHT: Sound + Help ====== */}
      <div
        className={`fixed right-5 top-6 z-[100] flex items-center gap-3 sm:right-8 sm:top-7 transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
      >
        <SoundToggle position="inline" />
        <HelpButton />
      </div>

      {/* ====== BOTTOM NAV ARROWS (hidden in Battle Mode) ====== */}
      {source !== "battle" && (
        <div
          className={`fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-4 transition-all duration-700 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          {/* Left arrow -- to Squads & Alliances */}
          <button
            onClick={handlePrev}
            className="group flex cursor-pointer items-center justify-center border border-danger/20 bg-[#0a0a0f]/70 p-3 backdrop-blur-sm transition-all duration-400 hover:border-danger/40 hover:bg-danger/[0.06]"
            style={{
              clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
            }}
            aria-label="Navigate to Squads and Alliances"
          >
            <ChevronLeft className="h-5 w-5 text-danger/40 transition-all duration-300 group-hover:text-danger/70 group-hover:-translate-x-0.5" />
          </button>

          {/* Right arrow -- to Profile */}
          <button
            onClick={handleNext}
            className="group flex cursor-pointer items-center justify-center border border-danger/20 bg-[#0a0a0f]/70 p-3 backdrop-blur-sm transition-all duration-400 hover:border-danger/40 hover:bg-danger/[0.06]"
            style={{
              clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
            }}
            aria-label="Navigate to Profile"
          >
            <ChevronRight className="h-5 w-5 text-danger/40 transition-all duration-300 group-hover:text-danger/70 group-hover:translate-x-0.5" />
          </button>
        </div>
      )}

      {/* ====== BOTTOM VERSION TAG ====== */}
      <div
        className={`fixed bottom-5 right-5 z-20 transition-all duration-700 delay-700 sm:bottom-7 sm:right-8 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/20">
          Contact v1.0
        </p>
      </div>
    </div>
  )
}
