"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function BattleScreen() {
  const [mounted, setMounted] = useState(false)
  const [gunVisible, setGunVisible] = useState(false)

  useEffect(() => {
    // Fade in background first
    const bgTimer = setTimeout(() => setMounted(true), 50)
    // Delayed fade-in for gun (300ms after background starts)
    const gunTimer = setTimeout(() => setGunVisible(true), 350)
    
    return () => {
      clearTimeout(bgTimer)
      clearTimeout(gunTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#0a0a0f" }}>
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
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ============= AVATAR TARGETS ============= */}
      
      {/* Avatar 1 - Far Left Sniper */}
      <div
        className="pointer-events-none absolute z-[4]"
        style={{
          left: "8%",
          bottom: "18%",
          transform: "translateX(-50%) scale(1.85)",
          height: "clamp(180px, 28vh, 320px)",
          width: "auto",
        }}
      >
        <Image
          src="/images/avatar1.png"
          alt="Target 1"
          width={400}
          height={600}
          className="h-full w-auto object-contain"
          unoptimized
        />
      </div>

      {/* Avatar 2 - Front Left Kneeling */}
      <div
        className="pointer-events-none absolute z-[5]"
        style={{
          left: "26%",
          bottom: "14%",
          transform: "translateX(-50%) scale(2.15)",
          height: "clamp(200px, 32vh, 360px)",
          width: "auto",
        }}
      >
        <Image
          src="/images/avatar2.png"
          alt="Target 2"
          width={400}
          height={600}
          className="h-full w-auto object-contain"
          unoptimized
        />
      </div>

      {/* Avatar 3 - Center Primary Target */}
      <div
        className="pointer-events-none absolute z-[6]"
        style={{
          left: "50%",
          bottom: "18%",
          transform: "translateX(-50%) scale(2.35)",
          height: "clamp(220px, 35vh, 400px)",
          width: "auto",
        }}
      >
        <Image
          src="/images/avatar3.png"
          alt="Target 3 - Primary"
          width={400}
          height={600}
          className="h-full w-auto object-contain"
          unoptimized
        />
      </div>

      {/* Avatar 4 - Mid Right Elevated */}
      <div
        className="pointer-events-none absolute z-[4]"
        style={{
          left: "74%",
          bottom: "22%",
          transform: "translateX(-50%) scale(1.95)",
          height: "clamp(190px, 30vh, 340px)",
          width: "auto",
        }}
      >
        <Image
          src="/images/avatar4.png"
          alt="Target 4"
          width={400}
          height={600}
          className="h-full w-auto object-contain"
          unoptimized
        />
      </div>

      {/* Avatar 5 - Far Right Rifle */}
      <div
        className="pointer-events-none absolute z-[4]"
        style={{
          left: "92%",
          bottom: "18%",
          transform: "translateX(-50%) scale(1.85)",
          height: "clamp(190px, 30vh, 340px)",
          width: "auto",
        }}
      >
        <Image
          src="/images/avatar5.png"
          alt="Target 5"
          width={400}
          height={600}
          className="h-full w-auto object-contain"
          unoptimized
        />
      </div>

      {/* ============= GUN OVERLAY ============= */}
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
