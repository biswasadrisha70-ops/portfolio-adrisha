"use client"

import { useState, useCallback } from "react"
import { CharacterSelect } from "@/components/character-select"
import { ModeSelect } from "@/components/mode-select"
import { StatusBar } from "@/components/status-bar"
import { Scanlines } from "@/components/scanlines"
import { GridBackground } from "@/components/grid-background"
import { SoundToggle } from "@/components/sound-toggle"
import { SoundProvider } from "@/hooks/use-sound"

export default function Home() {
  const [screen, setScreen] = useState<"character" | "mode">("character")
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [transitioning, setTransitioning] = useState(false)

  const handleRoleConfirmed = useCallback((role: string) => {
    setTransitioning(true)
    setSelectedRole(role)
    setTimeout(() => {
      setScreen("mode")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleBack = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("character")
      setSelectedRole("")
      setTransitioning(false)
    }, 600)
  }, [])

  return (
    <SoundProvider>
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6">
        {/* Background layers */}
        <GridBackground />
        <Scanlines />

        {/* Sound toggle */}
        <SoundToggle />

        {/* Radial vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Screen content with fade transition */}
        <div
          className={`relative z-20 w-full transition-all duration-500 ease-in-out ${
            transitioning ? "scale-[0.98] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {screen === "character" ? (
            <CharacterSelect onRoleConfirmed={handleRoleConfirmed} />
          ) : (
            <ModeSelect selectedRole={selectedRole} onBack={handleBack} />
          )}
        </div>

        {/* Status bar */}
        <StatusBar />
      </main>
    </SoundProvider>
  )
}
