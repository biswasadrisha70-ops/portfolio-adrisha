"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

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
  { id: 1, label: "SQUADS & ALLIANCES" },
  { id: 2, label: "MISSIONS" },
  { id: 3, label: "PROFILE" },
  { id: 4, label: "CORE ABILITIES" },
  { id: 5, label: "CONTACT" },
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
      {/* Outer glow - reduced 15% */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 70%, rgba(200,50,35,0.21) 0%, rgba(150,30,20,0.13) 40%, transparent 70%)",
          filter: "blur(28px)",
          animation: "aura-flicker 3s ease-in-out infinite",
        }}
      />
      {/* Inner rim light - reduced 15% */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 55%, rgba(255,80,50,0.17) 0%, rgba(220,60,40,0.085) 30%, transparent 55%)",
          filter: "blur(12px)",
        }}
      />
      {/* Silhouette edge highlight - reduced 15% */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 50%, rgba(255,100,60,0.13) 0%, transparent 40%)",
          filter: "blur(6px)",
          animation: "edge-pulse 2.5s ease-in-out infinite",
        }}
      />
      {/* Ember particles - reduced density by 10% (14 instead of 16) */}
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
      {/* Ground glow - reduced 15% */}
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

// ===================== MAIN COMPONENT =====================
export function BattleScreen() {
  const [mounted, setMounted] = useState(false)
  const [gunVisible, setGunVisible] = useState(false)

  useEffect(() => {
    const bgTimer = setTimeout(() => setMounted(true), 50)
    const gunTimer = setTimeout(() => setGunVisible(true), 350)
    return () => {
      clearTimeout(bgTimer)
      clearTimeout(gunTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#0a0a0f" }}>
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

      `}</style>

      {/* ============= BATTLEFIELD BACKGROUND ============= */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-500 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
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

      {/* ============= AVATAR TARGETS WITH AURA & ANCHORED LABELS ============= */}
      {AVATAR_TARGETS.map((avatar, index) => (
        <div
          key={avatar.id}
          className="pointer-events-none absolute inline-block"
          style={{
            left: avatar.left,
            bottom: avatar.bottom,
            transform: `translateX(-50%) scale(${avatar.scale})`,
            height: avatar.height,
            width: "auto",
            zIndex: avatar.z,
          }}
        >
          {/* Label anchored above head */}
          <div
            className="absolute whitespace-nowrap text-center"
            style={{
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: "10px",
            }}
          >
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "30px",
                letterSpacing: "3px",
                fontWeight: 600,
                color: "#00CFFF",
                whiteSpace: "nowrap",
                textShadow: "0 0 6px rgba(0,200,255,0.6)",
              }}
            >
              {AVATAR_LABELS[index].label}
            </span>
          </div>

          {/* Red Aura Engine */}
          <RedAuraEngine />
          
          {/* Avatar Image */}
          <Image
            src={avatar.src}
            alt={`Target ${avatar.id}`}
            width={400}
            height={600}
            className="relative h-full w-auto object-contain"
            unoptimized
          />
        </div>
      ))}

      {/* ============= GUN OVERLAY WITH ENERGY CROSS ============= */}
      <div
        className={`pointer-events-none fixed bottom-0 left-1/2 z-[10] -translate-x-1/2 transition-opacity duration-500 ease-out ${
          gunVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "clamp(300px, 40vw, 600px)",
          height: "auto",
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
