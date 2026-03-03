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

// ===================== TOP-ALIGNED HUD LABELS =====================
const HUD_LABELS = [
  { id: 1, label: "SQUADS & ALLIANCES", left: "12%" },
  { id: 2, label: "MISSIONS", left: "30%" },
  { id: 3, label: "PROFILE", left: "50%" },
  { id: 4, label: "CORE ABILITIES", left: "72%" },
  { id: 5, label: "CONTACT", left: "90%" },
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

// ===================== GUN TIP ENERGY CROSS =====================
function GunTipEnergyCross() {
  return (
    <div 
      className="pointer-events-none absolute"
      style={{
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {/* Outer bloom */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,191,255,0.15) 0%, transparent 70%)",
          filter: "blur(4px)",
          animation: "bloom-pulse 2s ease-in-out infinite",
        }}
      />
      {/* Center glow point */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,200,255,1) 0%, rgba(0,191,255,0.6) 50%, transparent 100%)",
          boxShadow: "0 0 12px rgba(0,191,255,0.9), 0 0 24px rgba(0,191,255,0.5)",
          animation: "energy-pulse 1.5s ease-in-out infinite",
        }}
      />
      {/* Crosshair flare - horizontal */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 24,
          height: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(0,191,255,0.8) 30%, rgba(100,200,255,1) 50%, rgba(0,191,255,0.8) 70%, transparent 100%)",
          boxShadow: "0 0 8px rgba(0,191,255,0.6)",
          animation: "cross-flicker 2s ease-in-out infinite",
        }}
      />
      {/* Crosshair flare - vertical */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 2,
          height: 24,
          background: "linear-gradient(180deg, transparent 0%, rgba(0,191,255,0.8) 30%, rgba(100,200,255,1) 50%, rgba(0,191,255,0.8) 70%, transparent 100%)",
          boxShadow: "0 0 8px rgba(0,191,255,0.6)",
          animation: "cross-flicker 2s ease-in-out infinite",
          animationDelay: "0.5s",
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
        @keyframes cross-flicker {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes energy-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        }
        @keyframes bloom-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
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

      {/* ============= CLEAN TOP-ALIGNED HUD LABELS ============= */}
      {HUD_LABELS.map((item) => (
        <div
          key={item.id}
          className="pointer-events-none absolute z-[20] whitespace-nowrap text-center"
          style={{
            top: "8%",
            left: item.left,
            transform: "translateX(-50%)",
          }}
        >
          <span
            className="font-mono font-bold uppercase"
            style={{
              fontSize: "clamp(16px, 1.2vw, 22px)",
              letterSpacing: "3px",
              color: "#00CFFF",
              textShadow: "0 0 8px rgba(0,207,255,0.6), 0 0 16px rgba(0,207,255,0.3)",
            }}
          >
            {item.label}
          </span>
        </div>
      ))}

      {/* ============= AVATAR TARGETS WITH AURA ONLY ============= */}
      {AVATAR_TARGETS.map((avatar) => (
        <div
          key={avatar.id}
          className="pointer-events-none absolute"
          style={{
            left: avatar.left,
            bottom: avatar.bottom,
            transform: `translateX(-50%) scale(${avatar.scale})`,
            height: avatar.height,
            width: "auto",
            zIndex: avatar.z,
          }}
        >
          {/* Toned down Red Aura Engine */}
          <RedAuraEngine />
          
          {/* Avatar Image */}
          <Image
            src={avatar.src}
            alt={`Target ${avatar.id}`}
            width={400}
            height={600}
            className="relative z-[2] h-full w-auto object-contain"
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
        {/* Gun Tip Energy Cross */}
        <GunTipEnergyCross />
        
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
