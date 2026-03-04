"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Image from "next/image"
import { SoundToggle } from "@/components/sound-toggle"
import { HelpButton } from "@/components/help-button"
import { ArrowLeft } from "lucide-react"
import { useSound } from "@/hooks/use-sound"

// ===================== AVATAR TARGET DATA =====================
const AVATAR_TARGETS = [
  { id: 1, src: "/images/avatar1.png", left: "10%", bottom: "8%", scale: 2.4, height: "clamp(180px, 28vh, 320px)", z: 4 },
  { id: 2, src: "/images/avatar2.png", left: "28%", bottom: "5%", scale: 2.8, height: "clamp(200px, 32vh, 360px)", z: 5 },
  { id: 3, src: "/images/avatar3.png", left: "50%", bottom: "10%", scale: 3.0, height: "clamp(220px, 35vh, 400px)", z: 6 },
  { id: 4, src: "/images/avatar4.png", left: "72%", bottom: "12%", scale: 2.5, height: "clamp(190px, 30vh, 340px)", z: 4 },
  { id: 5, src: "/images/avatar5.png", left: "90%", bottom: "8%", scale: 2.4, height: "clamp(190px, 30vh, 340px)", z: 4 },
]

// ===================== AVATAR-ANCHORED HUD LABELS =====================
const AVATAR_LABELS = [
  { id: 1, label: "ALLIANCES", page: "alliances" },
  { id: 2, label: "MISSIONS", page: "missions" },
  { id: 3, label: "PROFILE", page: "profile" },
  { id: 4, label: "STRENGTHS", page: "abilities" },
  { id: 5, label: "CONTACT", page: "contact" },
]

// ===================== TONED DOWN RED AURA ENGINE (15% reduced) =====================
function RedAuraEngine() {
  const sparks = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 2.5,
      size: 2.5 + Math.random() * 3.5,
    })), []
  )

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 70%, rgba(200,50,35,0.21) 0%, rgba(150,30,20,0.13) 40%, transparent 70%)",
          filter: "blur(28px)",
          animation: "aura-flicker 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 55%, rgba(255,80,50,0.17) 0%, rgba(220,60,40,0.085) 30%, transparent 55%)",
          filter: "blur(12px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 50%, rgba(255,100,60,0.13) 0%, transparent 40%)",
          filter: "blur(6px)",
          animation: "edge-pulse 2.5s ease-in-out infinite",
        }}
      />
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: `${spark.left}%`,
            bottom: "8%",
            width: spark.size,
            height: spark.size,
            background: "radial-gradient(circle, rgba(255,140,70,0.9) 0%, rgba(220,60,30,0.45) 100%)",
            boxShadow: "0 0 6px rgba(255,120,60,0.7), 0 0 12px rgba(255,80,40,0.35)",
            animation: `ember-rise ${spark.duration}s ease-out infinite`,
            animationDelay: `${spark.delay}s`,
          }}
        />
      ))}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "100%",
          height: "20%",
          background: "radial-gradient(ellipse at center bottom, rgba(200,60,40,0.3) 0%, rgba(150,40,25,0.17) 40%, transparent 70%)",
          filter: "blur(8px)",
          animation: "ground-glow 4s ease-in-out infinite",
        }}
      />
    </div>
  )
}

// ===================== HUD LABEL TAG (Angular Sci-Fi) =====================
function HudLabelBox({ label }: { label: string }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 3,
        size: 1.5 + Math.random() * 2,
      })),
    []
  )

  return (
    <div className="relative inline-block" style={{ maxWidth: "85vw" }}>
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: `${spark.left}%`,
            bottom: "0%",
            width: spark.size,
            height: spark.size,
            background: "radial-gradient(circle, rgba(0,200,255,0.9) 0%, rgba(0,160,220,0.4) 100%)",
            boxShadow: "0 0 4px rgba(0,200,255,0.6)",
            opacity: 0,
            animation: `hud-spark-rise ${spark.duration}s ease-out infinite`,
            animationDelay: `${spark.delay}s`,
          }}
        />
      ))}
      <div
        className="relative"
        style={{
          display: "inline-block",
          padding: "4px 8px",
          border: "1px solid rgba(0,200,255,0.9)",
          background: "linear-gradient(180deg, rgba(10,20,35,0.85), rgba(0,10,20,0.75))",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
          clipPath:
            "polygon(0% 25%, 8% 0%, 92% 0%, 100% 25%, 100% 75%, 92% 100%, 8% 100%, 0% 75%)",
          boxShadow:
            "0 0 6px rgba(0,200,255,0.6), 0 0 14px rgba(0,200,255,0.4), inset 0 0 6px rgba(0,200,255,0.35)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{ top: 2, left: 6, width: 4, height: 4, background: "#00CFFF", opacity: 0.7, boxShadow: "0 0 4px rgba(0,207,255,0.8)" }}
        />
        <div
          className="absolute rounded-full"
          style={{ bottom: 2, right: 6, width: 4, height: 4, background: "#00CFFF", opacity: 0.7, boxShadow: "0 0 4px rgba(0,207,255,0.8)" }}
        />
        <span
          className="uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "8px",
            letterSpacing: "2px",
            fontWeight: 600,
            color: "#00CFFF",
            whiteSpace: "nowrap",
            textShadow: "0 0 4px rgba(0,200,255,0.5)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

// ===================== LABEL COLLISION OFFSETS =====================
const LABEL_VERTICAL_OFFSETS = [5, 10, 0, 8, 5]

const LABEL_EDGE_TRANSFORMS = [
  "translateX(-55%)",
  "translateX(-50%)",
  "translateX(-50%)",
  "translateX(-50%)",
  "translateX(-45%)",
]

// ===================== PARTICLE SYSTEM (Canvas-based) =====================
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  r: number
  g: number
  b: number
}

function useParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const activeRef = useRef(false)

  const spawnParticles = useCallback((x: number, y: number, count: number) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 4
      const isRed = Math.random() > 0.3
      newParticles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 2,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4,
        size: 2 + Math.random() * 4,
        r: isRed ? 200 + Math.random() * 55 : 255,
        g: isRed ? 50 + Math.random() * 80 : 140 + Math.random() * 60,
        b: isRed ? 20 + Math.random() * 30 : 50 + Math.random() * 30,
      })
    }
    particlesRef.current.push(...newParticles)
    if (!activeRef.current) {
      activeRef.current = true
      animate()
    }
  }, [])

  const spawnTransitionParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const w = canvas.width
    const h = canvas.height
    const newParticles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 3,
        vy: -0.5 - Math.random() * 2,
        life: 1,
        maxLife: 0.8 + Math.random() * 0.5,
        size: 2 + Math.random() * 3,
        r: 200 + Math.random() * 55,
        g: 40 + Math.random() * 60,
        b: 20 + Math.random() * 30,
      })
    }
    particlesRef.current.push(...newParticles)
    if (!activeRef.current) {
      activeRef.current = true
      animate()
    }
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.08
      p.vx *= 0.98
      p.life -= 1 / (60 * p.maxLife)

      if (p.life <= 0) {
        particles.splice(i, 1)
        continue
      }

      const alpha = p.life * 0.9
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`
      ctx.fill()

      // glow
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * p.life * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha * 0.3})`
      ctx.fill()
    }

    if (particles.length > 0) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      activeRef.current = false
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { canvasRef, spawnParticles, spawnTransitionParticles }
}

// ===================== SCORE BAR COMPONENT =====================
function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      {/* Score Label */}
      <span
        className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold"
        style={{
          color: "rgba(0,207,255,0.9)",
          textShadow: "0 0 6px rgba(0,200,255,0.5)",
        }}
      >
        Score
      </span>

      {/* Progress Bar Container */}
      <div
        className="relative h-3 w-32 sm:w-40 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(0,20,40,0.8) 0%, rgba(0,10,20,0.9) 100%)",
          border: "1px solid rgba(0,207,255,0.6)",
          boxShadow:
            "0 0 8px rgba(0,207,255,0.4), inset 0 0 4px rgba(0,207,255,0.2)",
          clipPath:
            "polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)",
        }}
      >
        {/* Progress Fill */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
          style={{
            width: `${score}%`,
            background:
              "linear-gradient(90deg, rgba(0,180,255,0.9) 0%, rgba(0,220,255,1) 50%, rgba(100,240,255,1) 100%)",
            boxShadow:
              "0 0 10px rgba(0,207,255,0.8), 0 0 20px rgba(0,207,255,0.4)",
          }}
        />

        {/* Animated glow effect on fill */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
          style={{
            width: `${score}%`,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
            animation: "score-shimmer 2s ease-in-out infinite",
          }}
        />

        {/* Segment markers */}
        {[20, 40, 60, 80].map((marker) => (
          <div
            key={marker}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${marker}%`,
              background: "rgba(0,207,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Percentage Display */}
      <span
        className="font-mono text-[10px] font-bold tabular-nums"
        style={{
          color: "rgba(0,207,255,1)",
          textShadow: "0 0 6px rgba(0,200,255,0.6)",
          minWidth: "32px",
        }}
      >
        {score}%
      </span>
    </div>
  )
}

// ===================== MAIN COMPONENT =====================
interface BattleScreenProps {
  onBack?: () => void
  onNavigate?: (page: string) => void
  onVictory?: () => void
}

export function BattleScreen({ onBack, onNavigate, onVictory }: BattleScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [gunVisible, setGunVisible] = useState(false)
  const { enabled: soundEnabled } = useSound()

  // Score state
  const [score, setScore] = useState(0)
  const [hitAvatars, setHitAvatars] = useState<Set<number>>(new Set())

  // Laser state
  const [laserActive, setLaserActive] = useState(false)
  const [laserStart, setLaserStart] = useState({ x: 0, y: 0 })
  const [laserEnd, setLaserEnd] = useState({ x: 0, y: 0 })

  // Hit state
  const [hitPoint, setHitPoint] = useState<{ x: number; y: number } | null>(null)
  const [dissolveIndex, setDissolveIndex] = useState<number | null>(null)
  const [screenShake, setScreenShake] = useState(false)
  const [muzzleFlash, setMuzzleFlash] = useState(false)
  const [gunRecoil, setGunRecoil] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [interactionLocked, setInteractionLocked] = useState(false)

  // Refs
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const laserAudioRef = useRef<HTMLAudioElement | null>(null)

  const { canvasRef, spawnParticles, spawnTransitionParticles } = useParticleCanvas()

  // Preload laser sound
  useEffect(() => {
    const audio = new Audio("/sounds/laser-zap.mp3")
    audio.volume = 0.7
    audio.preload = "auto"
    laserAudioRef.current = audio
  }, [])

  useEffect(() => {
    const bgTimer = setTimeout(() => setMounted(true), 50)
    const gunTimer = setTimeout(() => setGunVisible(true), 350)
    return () => {
      clearTimeout(bgTimer)
      clearTimeout(gunTimer)
    }
  }, [])

  const handleAvatarClick = useCallback((index: number) => {
    if (interactionLocked) return
    setInteractionLocked(true)

    const avatarEl = avatarRefs.current[index]
    const container = containerRef.current
    if (!avatarEl || !container) return

    const avatarRect = avatarEl.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // Gun position (bottom center of screen)
    const gunX = containerRect.width / 2
    const gunY = containerRect.height - 60

    // Target center (avatar center-mass)
    const targetX = avatarRect.left - containerRect.left + avatarRect.width / 2
    const targetY = avatarRect.top - containerRect.top + avatarRect.height * 0.4

    // Play laser sound
    if (soundEnabled && laserAudioRef.current) {
      laserAudioRef.current.currentTime = 0
      laserAudioRef.current.play().catch(() => { })
    }

    // Track score - only increase if avatar hasn't been hit before
    const isFirstHit = !hitAvatars.has(index)
    if (isFirstHit) {
      setHitAvatars((prev) => new Set(prev).add(index))
      setScore((prev) => {
        const newScore = Math.min(prev + 20, 100)
        // Check for victory condition
        if (newScore >= 100) {
          // Delay victory screen to allow final animation to complete
          setTimeout(() => {
            if (onVictory) {
              onVictory()
            }
          }, 1800)
        }
        return newScore
      })
    }

    // 1. Muzzle flash + gun recoil + screen shake
    setMuzzleFlash(true)
    setGunRecoil(true)
    setScreenShake(true)
    setTimeout(() => setScreenShake(false), 120)
    setTimeout(() => setMuzzleFlash(false), 150)
    setTimeout(() => setGunRecoil(false), 180)

    // 2. Fire laser beam
    setLaserStart({ x: gunX, y: gunY })
    setLaserEnd({ x: targetX, y: targetY })
    setLaserActive(true)

    // 3. Hit impact after laser travel (180ms)
    setTimeout(() => {
      setLaserActive(false)
      setHitPoint({ x: targetX, y: targetY })

      // Spawn impact particles
      spawnParticles(targetX, targetY, 30)

      // 4. Start dissolve after impact (250ms)
      setTimeout(() => {
        setHitPoint(null)
        setDissolveIndex(index)

        // Spawn dissolve particles from avatar center
        spawnParticles(targetX, targetY, 60)

        // 5. Fade transition after dissolve (700ms)
        setTimeout(() => {
          setFadeOut(true)
          spawnTransitionParticles()

          // 6. Navigate after fade (400ms)
          setTimeout(() => {
            if (onNavigate) {
              onNavigate(AVATAR_LABELS[index].page)
            }
          }, 400)
        }, 700)
      }, 250)
    }, 180)
  }, [interactionLocked, soundEnabled, spawnParticles, spawnTransitionParticles, onNavigate, hitAvatars, onVictory])

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden ${screenShake ? "animate-shake" : ""}`}
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes ember-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { opacity: 0.9; }
          100% { transform: translateY(-140px) scale(0.2); opacity: 0; }
        }
        @keyframes aura-flicker {
          0%, 100% { opacity: 0.7; }
          25% { opacity: 0.85; }
          50% { opacity: 0.6; }
          75% { opacity: 0.8; }
        }
        @keyframes edge-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.85; }
        }
        @keyframes ground-glow {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 0.85; transform: translateX(-50%) scaleX(1.1); }
        }
        @keyframes hud-spark-rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.5; }
          50% { opacity: 0.4; }
          100% { transform: translateY(-28px) scale(0.3); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2px, 1px); }
          20% { transform: translate(3px, -1px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-3px, 1px); }
          60% { transform: translate(1px, -1px); }
          70% { transform: translate(-2px, 2px); }
          80% { transform: translate(3px, 1px); }
          90% { transform: translate(-1px, -2px); }
        }
        .animate-shake {
          animation: shake 0.12s ease-in-out;
        }
        @keyframes laser-fire {
          0% { stroke-dashoffset: 100%; opacity: 0.3; }
          30% { opacity: 1; }
          100% { stroke-dashoffset: 0%; opacity: 1; }
        }
        @keyframes hit-flash {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        @keyframes hit-ring {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; border-width: 3px; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; border-width: 1px; }
        }
        @keyframes dissolve-out {
          0% { filter: brightness(2) saturate(1.5); opacity: 1; transform: translateX(-50%) scale(var(--avatar-scale)); }
          30% { filter: brightness(3) saturate(0.5); opacity: 0.7; transform: translateX(-50%) scale(calc(var(--avatar-scale) * 1.02)); }
          100% { filter: brightness(0.5) saturate(0) blur(8px); opacity: 0; transform: translateX(-50%) scale(calc(var(--avatar-scale) * 0.95)); }
        }
        @keyframes muzzle-flash {
          0% { transform: translate(-50%, -100%) scale(0.5); opacity: 1; }
          50% { transform: translate(-50%, -100%) scale(1.2); opacity: 0.9; }
          100% { transform: translate(-50%, -100%) scale(1.5); opacity: 0; }
        }
        @keyframes score-shimmer {
          0%, 100% { opacity: 0.3; transform: translateX(-100%); }
          50% { opacity: 0.6; transform: translateX(100%); }
        }
      `}</style>

      {/* ============= BATTLEFIELD BACKGROUND ============= */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-500 ease-out ${mounted ? "opacity-100" : "opacity-0"
          }`}
      >
        <Image
          src="/images/battlefield.png"
          alt="Battlefield environment"
          fill
          className="object-cover"
          style={{ objectPosition: "center" }}
          priority
        />
      </div>

      {/* ============= CINEMATIC VIGNETTE OVERLAY ============= */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ============= TOP-LEFT HUD: BACK BUTTON + SCORE BAR ============= */}
      <div
        className={`fixed left-5 top-5 z-[20] flex items-center gap-4 sm:left-8 sm:top-7 transition-all duration-500 ${
          mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
      >
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="group flex cursor-pointer items-center gap-2 font-mono text-[12px] uppercase tracking-[0.25em]"
            style={{
              color: "rgba(0,207,255,0.7)",
              textShadow: "0 0 8px rgba(0,200,255,0.4)",
            }}
            aria-label="Back to mode select"
          >
            <ArrowLeft
              className="transition-transform duration-300 group-hover:-translate-x-1"
              style={{ width: 16, height: 16, filter: "drop-shadow(0 0 4px rgba(0,200,255,0.5))" }}
            />
            <span className="group-hover:text-[rgba(0,207,255,1)] transition-colors duration-300">Back</span>
          </button>
        )}

        {/* Score Bar */}
        <ScoreBar score={score} />
      </div>

      {/* ============= TOP-RIGHT HUD: SOUND + HELP ============= */}
      <div
        className={`fixed right-5 top-5 z-[20] flex items-center gap-3 sm:right-8 sm:top-7 transition-all duration-700 ${mounted ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
          }`}
      >
        <SoundToggle position="inline" />
        <HelpButton />
      </div>

      {/* ============= AVATAR TARGETS WITH AURA & ANCHORED LABELS ============= */}
      {AVATAR_TARGETS.map((avatar, index) => (
        <div
          ref={(el) => { avatarRefs.current[index] = el }}
          key={avatar.id}
          className="pointer-events-none absolute inline-block"
          style={{
            left: avatar.left,
            bottom: avatar.bottom,
            transform: `translateX(-50%) scale(${avatar.scale})`,
            height: avatar.height,
            width: "auto",
            zIndex: avatar.z,
            ["--avatar-scale" as string]: avatar.scale,
            ...(dissolveIndex === index
              ? { animation: "dissolve-out 0.8s ease-out forwards" }
              : {}),
          }}
        >
          {/* HUD label anchored above head */}
          <div
            className="pointer-events-none absolute whitespace-nowrap text-center"
            style={{
              bottom: "100%",
              left: "50%",
              transform: LABEL_EDGE_TRANSFORMS[index],
              marginBottom: `${4 + LABEL_VERTICAL_OFFSETS[index]}px`,
            }}
          >
            <HudLabelBox label={AVATAR_LABELS[index].label} />
          </div>

          {/* Red Aura Engine */}
          <RedAuraEngine />

          {/* Avatar Image — sole click target */}
          <Image
            src={avatar.src}
            alt={`Target ${avatar.id}`}
            width={400}
            height={600}
            className="relative h-full w-auto object-contain"
            unoptimized
          />
          <div
            className={`absolute left-1/2 top-[10%] h-[80%] w-[50%] -translate-x-1/2 ${interactionLocked ? "pointer-events-none cursor-default" : "pointer-events-auto cursor-crosshair"
              }`}
            onClick={() => handleAvatarClick(index)}
          />
        </div>
      ))}

      {/* ============= LASER BEAM SVG ============= */}
      {laserActive && (
        <svg
          className="pointer-events-none fixed inset-0 z-[15]"
          width="100%"
          height="100%"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,207,255,0.8))" }}
        >
          {/* Outer glow */}
          <line
            x1={laserStart.x}
            y1={laserStart.y}
            x2={laserEnd.x}
            y2={laserEnd.y}
            stroke="rgba(0,207,255,0.3)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ animation: "laser-fire 0.18s ease-out forwards" }}
          />
          {/* Core beam */}
          <line
            x1={laserStart.x}
            y1={laserStart.y}
            x2={laserEnd.x}
            y2={laserEnd.y}
            stroke="rgba(100,220,255,1)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animation: "laser-fire 0.18s ease-out forwards" }}
          />
          {/* Bright center */}
          <line
            x1={laserStart.x}
            y1={laserStart.y}
            x2={laserEnd.x}
            y2={laserEnd.y}
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ animation: "laser-fire 0.18s ease-out forwards" }}
          />
        </svg>
      )}

      {/* ============= HIT IMPACT EFFECT ============= */}
      {hitPoint && (
        <div className="pointer-events-none fixed inset-0 z-[16]">
          {/* Flash */}
          <div
            className="absolute"
            style={{
              left: hitPoint.x,
              top: hitPoint.y,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(100,220,255,1) 0%, rgba(0,207,255,0.6) 40%, transparent 70%)",
              animation: "hit-flash 0.25s ease-out forwards",
            }}
          />
          {/* Shockwave ring */}
          <div
            className="absolute"
            style={{
              left: hitPoint.x,
              top: hitPoint.y,
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "2px solid rgba(0,207,255,0.7)",
              boxShadow: "0 0 12px rgba(0,207,255,0.5)",
              animation: "hit-ring 0.3s ease-out forwards",
            }}
          />
        </div>
      )}

      {/* ============= MUZZLE FLASH ============= */}
      {muzzleFlash && (
        <div
          className="pointer-events-none fixed z-[12]"
          style={{
            left: "50%",
            bottom: 55,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,220,255,1) 0%, rgba(0,207,255,0.5) 50%, transparent 70%)",
            animation: "muzzle-flash 0.15s ease-out forwards",
          }}
        />
      )}

      {/* ============= PARTICLE CANVAS ============= */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[17]"
        style={{ width: "100%", height: "100%" }}
      />

      {/* ============= FADE-OUT OVERLAY ============= */}
      <div
        className="pointer-events-none fixed inset-0 z-[18] transition-opacity ease-in"
        style={{
          backgroundColor: "rgba(5,5,10,1)",
          opacity: fadeOut ? 1 : 0,
          transitionDuration: "400ms",
        }}
      />

      {/* ============= GUN OVERLAY WITH ENERGY CROSS ============= */}
      <div
        className={`pointer-events-none fixed bottom-0 z-[10] transition-opacity duration-500 ease-out ${gunVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{
          left: "50%",
          width: "clamp(300px, 40vw, 600px)",
          height: "auto",
          transform: `translateX(-50%) ${gunRecoil ? "translateY(6px)" : "translateY(0)"}`,
          transition: "transform 0.12s ease-out",
        }}
      >
        <Image
          src="/images/gun.png"
          alt="Weapon"
          width={600}
          height={400}
          className="h-auto w-full object-contain"
          style={{ objectPosition: "bottom center" }}
          priority
        />
      </div>
    </div>
  )
}
