"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { useSound } from "@/hooks/use-sound"

// ---------- CONSTANTS ----------
const TOTAL_DURATION = 6000     // full loading duration in ms
const FADE_IN_MS = 500          // how long the screen fades in
const FADE_OUT_MS = 800         // how long the exit fade takes
const AUDIO_FADE_MS = 600       // smooth audio fade-out length
const AUDIO_VOLUME = 0.5        // peak audio volume

// Progress easing: slow 0-60% over ~4 s, then fast 60-100% over ~2 s
const SLOW_PHASE_END = 4000     // first 4 seconds
const SLOW_PHASE_TARGET = 60    // reach 60 % at 4 s
const FAST_PHASE_DURATION = TOTAL_DURATION - SLOW_PHASE_END - 200 // leave 200 ms buffer
const FAST_PHASE_TARGET = 40    // remaining 40 %

interface CinematicLoaderProps {
  /** The selected mode label shown during loading */
  modeLabel: string
  /** Called when the loading sequence is complete */
  onComplete: () => void
}

export function CinematicLoader({
  modeLabel,
  onComplete,
}: CinematicLoaderProps) {
  const [phase, setPhase] = useState<"enter" | "active" | "exit">("enter")
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { enabled: soundEnabled } = useSound()

  // ---- helpers ----
  const clearFade = useCallback(() => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current)
      fadeRef.current = null
    }
  }, [])

  const fadeOutAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    clearFade()
    const steps = 25
    const stepTime = AUDIO_FADE_MS / steps
    const volumeStep = audio.volume / steps
    fadeRef.current = setInterval(() => {
      if (!audioRef.current || audioRef.current.volume - volumeStep <= 0.005) {
        if (audioRef.current) {
          audioRef.current.volume = 0
          audioRef.current.pause()
        }
        clearFade()
      } else {
        audioRef.current.volume = Math.max(audioRef.current.volume - volumeStep, 0)
      }
    }, stepTime)
  }, [clearFade])

  // ---- audio lifecycle ----
  useEffect(() => {
    if (!soundEnabled) return
    const audio = new Audio("/audio/loading-page.mp3")
    audio.volume = AUDIO_VOLUME
    audio.preload = "auto"
    audioRef.current = audio
    audio.play().catch(() => {})

    return () => {
      clearFade()
      audio.pause()
      audio.src = ""
    }
  }, [soundEnabled, clearFade])

  // ---- phase sequencing ----
  useEffect(() => {
    // enter -> active
    const enterTimer = setTimeout(() => setPhase("active"), FADE_IN_MS)

    // active -> exit  (start fading out before the end)
    const exitTimer = setTimeout(() => {
      setPhase("exit")
      fadeOutAudio()
    }, TOTAL_DURATION - FADE_OUT_MS)

    // fire completion callback after full duration
    const completeTimer = setTimeout(onComplete, TOTAL_DURATION)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete, fadeOutAudio])

  // ---- custom eased progress bar ----
  useEffect(() => {
    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start

      let value: number

      if (elapsed <= SLOW_PHASE_END) {
        // Slow phase: ease-out cubic  0 -> 60 %
        const t = Math.min(elapsed / SLOW_PHASE_END, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        value = eased * SLOW_PHASE_TARGET
      } else {
        // Fast phase: ease-in-out quad  60 -> 100 %
        const fastElapsed = elapsed - SLOW_PHASE_END
        const t = Math.min(fastElapsed / FAST_PHASE_DURATION, 1)
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        value = SLOW_PHASE_TARGET + eased * FAST_PHASE_TARGET
      }

      setProgress(Math.min(value, 100))
      if (elapsed < TOTAL_DURATION - 200) requestAnimationFrame(tick)
      else setProgress(100)
    }

    requestAnimationFrame(tick)
  }, [])

  // Random particles for cinematic depth
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: `${Math.random() * 6 + 4}s`,
        delay: `${Math.random() * 3}s`,
        opacity: Math.random() * 0.5 + 0.15,
      })),
    []
  )

  const isVisible = phase !== "exit"

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ease-in-out ${
        phase === "enter"
          ? "opacity-0"
          : isVisible
            ? "opacity-100"
            : "opacity-0"
      }`}
      style={{ backgroundColor: "var(--background)" }}
      role="alert"
      aria-live="assertive"
      aria-label={`Loading ${modeLabel}`}
    >
      {/* Animated red gradient background */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 30% 40%, rgba(130, 20, 20, 0.12) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 70% 60%, rgba(110, 15, 15, 0.10) 0%, transparent 55%)",
          backgroundSize: "300% 300%",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-cinematic-breathe pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(120, 18, 18, 0.09) 0%, transparent 65%)",
          filter: "blur(100px)",
          ["--breathe-min" as string]: "0.05",
          ["--breathe-max" as string]: "0.12",
          ["--breathe-mid" as string]: "0.07",
        }}
      />

      {/* Radial vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Floating particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
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
              boxShadow: `0 0 ${p.size * 4}px rgba(180, 50, 50, ${p.opacity * 0.6})`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Premium loading indicator: pulsing ring with inner dot */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating ring */}
          <div
            className="animate-loader-spin absolute h-20 w-20 rounded-full sm:h-24 sm:w-24"
            style={{
              border: "1px solid transparent",
              borderTopColor: "var(--danger)",
              borderRightColor: "rgba(180, 50, 50, 0.2)",
              filter: "drop-shadow(0 0 8px rgba(180, 50, 50, 0.4))",
            }}
          />
          {/* Middle counter-rotating ring */}
          <div
            className="animate-loader-spin-reverse absolute h-14 w-14 rounded-full sm:h-16 sm:w-16"
            style={{
              border: "1px solid transparent",
              borderBottomColor: "rgba(180, 50, 50, 0.5)",
              borderLeftColor: "rgba(180, 50, 50, 0.15)",
            }}
          />
          {/* Inner breathing dot */}
          <div
            className="animate-loader-pulse h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
            style={{
              backgroundColor: "var(--danger)",
              boxShadow:
                "0 0 20px rgba(180, 50, 50, 0.6), 0 0 60px rgba(180, 50, 50, 0.2)",
            }}
          />
        </div>

        {/* Text block */}
        <div className="flex flex-col items-center gap-3">
          <p
            className="animate-loader-text font-mono text-xs uppercase tracking-[0.35em] text-foreground/80 sm:text-sm"
          >
            Initializing Interface
          </p>
          <p className="animate-loader-text-delayed font-mono text-[10px] uppercase tracking-[0.25em] text-danger/50">
            {modeLabel}
          </p>
        </div>

        {/* Slim progress bar */}
        <div className="relative h-px w-48 overflow-hidden rounded-full bg-border/20 sm:w-56">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, rgba(180,50,50,0.3) 0%, var(--danger) 100%)",
              boxShadow: "0 0 12px rgba(180,50,50,0.5)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
