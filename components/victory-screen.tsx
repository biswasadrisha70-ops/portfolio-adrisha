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
    </div>
  )
}
