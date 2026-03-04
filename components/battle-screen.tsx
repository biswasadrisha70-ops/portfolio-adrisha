"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Image from "next/image"
import { SoundToggle } from "@/components/sound-toggle"
import { ArrowLeft } from "lucide-react"
import { useSound } from "@/hooks/use-sound"

// ===================== AVATAR TARGET DATA =====================
const AVATAR_TARGETS = [
  { id: 1, src: "/images/avatar1.png", left: "28%", bottom: "5%", scale: 2.8, height: "clamp(200px, 32vh, 360px)", z: 5 },
  { id: 2, src: "/images/avatar2.png", left: "10%", bottom: "8%", scale: 2.4, height: "clamp(180px, 28vh, 320px)", z: 4 },
  { id: 3, src: "/images/avatar3.png", left: "50%", bottom: "10%", scale: 3.0, height: "clamp(220px, 35vh, 400px)", z: 6 },
  { id: 4, src: "/images/avatar4.png", left: "72%", bottom: "12%", scale: 2.5, height: "clamp(190px, 30vh, 340px)", z: 4 },
  { id: 5, src: "/images/avatar5.png", left: "90%", bottom: "8%", scale: 2.4, height: "clamp(190px, 30vh, 340px)", z: 4 },
]

const AVATAR_LABELS = [
  { id: 1, label: "ALLIANCES", page: "alliances" },
  { id: 2, label: "MISSIONS", page: "missions" },
  { id: 3, label: "PROFILE", page: "profile" },
  { id: 4, label: "STRENGTHS", page: "abilities" },
  { id: 5, label: "CONTACT", page: "contact" },
]

// ===================== RED AURA ENGINE =====================
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
    </div>
  )
}

// ===================== HUD LABEL =====================
function HudLabelBox({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "4px 8px",
        border: "1px solid rgba(0,200,255,0.9)",
        background: "rgba(10,20,35,0.85)",
        color: "#00CFFF",
        fontSize: "8px",
        letterSpacing: "2px",
        fontWeight: 600,
        textShadow: "0 0 4px rgba(0,200,255,0.5)",
      }}
    >
      {label}
    </div>
  )
}

// ===================== MAIN COMPONENT =====================
interface BattleScreenProps {
  onBack?: () => void
  onNavigate?: (page: string) => void
}

export function BattleScreen({ onBack, onNavigate }: BattleScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [gunVisible, setGunVisible] = useState(false)
  const { enabled: soundEnabled } = useSound()

  const [laserActive, setLaserActive] = useState(false)
  const [laserStart, setLaserStart] = useState({ x: 0, y: 0 })
  const [laserEnd, setLaserEnd] = useState({ x: 0, y: 0 })

  const [hitPoint, setHitPoint] = useState<{ x: number; y: number } | null>(null)
  const [dissolveIndex, setDissolveIndex] = useState<number | null>(null)

  const avatarRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bgTimer = setTimeout(() => setMounted(true), 50)
    const gunTimer = setTimeout(() => setGunVisible(true), 350)
    return () => {
      clearTimeout(bgTimer)
      clearTimeout(gunTimer)
    }
  }, [])

  const handleAvatarClick = useCallback((index: number) => {
    const avatarEl = avatarRefs.current[index]
    const container = containerRef.current
    if (!avatarEl || !container) return

    const avatarRect = avatarEl.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const gunX = containerRect.width / 2
    const gunY = containerRect.height - 60

    const targetX = avatarRect.left - containerRect.left + avatarRect.width / 2
    const targetY = avatarRect.top - containerRect.top + avatarRect.height * 0.4

    setLaserStart({ x: gunX, y: gunY })
    setLaserEnd({ x: targetX, y: targetY })
    setLaserActive(true)

    setTimeout(() => {
      setLaserActive(false)
      setHitPoint({ x: targetX, y: targetY })

      setTimeout(() => {
        setDissolveIndex(index)

        setTimeout(() => {
          if (onNavigate) {
            onNavigate(AVATAR_LABELS[index].page)
          }
        }, 700)

      }, 250)
    }, 180)

  }, [onNavigate])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">

      <Image
        src="/images/battlefield.png"
        alt="Battlefield"
        fill
        className="object-cover"
      />

      {onBack && (
        <button
          onClick={onBack}
          className="fixed left-6 top-6 z-20 text-white text-xs"
        >
          <ArrowLeft size={16} /> Back
        </button>
      )}

      <div className="fixed right-6 top-6 z-20">
        <SoundToggle position="inline" />
      </div>

      {/* AVATARS */}
      {AVATAR_TARGETS.map((avatar, index) => (
        <div
          key={avatar.id}
          ref={(el) => { avatarRefs.current[index] = el }}
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: avatar.left,
            bottom: avatar.bottom,
            transform: `translateX(-50%) scale(${avatar.scale})`,
            height: avatar.height,
            zIndex: avatar.z,
          }}
        >

          {/* LABEL */}
          <div
            className="absolute text-center"
            style={{
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: "6px",
              pointerEvents: "none"
            }}
          >
            <HudLabelBox label={AVATAR_LABELS[index].label} />
          </div>

          <RedAuraEngine />

          {/* CLICKABLE IMAGE */}
          <Image
            src={avatar.src}
            alt={`Target ${avatar.id}`}
            width={400}
            height={600}
            className="cursor-crosshair"
            style={{ pointerEvents: "auto" }}
            onClick={(e) => {
              e.stopPropagation()
              handleAvatarClick(index)
            }}
          />

        </div>
      ))}

      {/* LASER */}
      {laserActive && (
        <svg className="fixed inset-0 pointer-events-none">
          <line
            x1={laserStart.x}
            y1={laserStart.y}
            x2={laserEnd.x}
            y2={laserEnd.y}
            stroke="cyan"
            strokeWidth="3"
          />
        </svg>
      )}

      {/* GUN */}
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${gunVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <Image
          src="/images/gun.png"
          alt="Weapon"
          width={600}
          height={400}
        />
      </div>

    </div>
  )
}