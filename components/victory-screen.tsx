"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { SoundToggle } from "@/components/sound-toggle"
import { HelpButton } from "@/components/help-button"

interface VictoryScreenProps {
  onEscape?: () => void
}

export function VictoryScreen({ onEscape }: VictoryScreenProps) {
  const [mounted, setMounted] = useState(false)

  // Handle ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        onEscape()
      }
    },
    [onEscape]
  )

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      {/* Victory Background Image */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/images/victory.png"
          alt="Victory"
          fill
          className="object-cover"
          style={{ objectPosition: "center" }}
          priority
        />
      </div>

      {/* Top-right HUD: Sound + Help */}
      <div
        className={`fixed right-5 top-5 z-[20] flex items-center gap-3 sm:right-8 sm:top-7 transition-all duration-700 ${
          mounted ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        }`}
      >
        <SoundToggle position="inline" />
        <HelpButton />
      </div>

      {/* Bottom Escape Instruction */}
      <div
        className={`fixed inset-x-0 bottom-8 z-[20] flex justify-center transition-all duration-1000 delay-500 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p
          className="font-mono text-sm uppercase tracking-[0.25em] sm:text-base"
          style={{
            color: "rgba(255, 80, 80, 0.95)",
            textShadow:
              "0 0 10px rgba(255, 50, 50, 0.8), 0 0 20px rgba(255, 50, 50, 0.5), 0 0 30px rgba(255, 50, 50, 0.3)",
          }}
        >
          Press ESCAPE to return to Mode Selection
        </p>
      </div>
    </div>
  )
}
