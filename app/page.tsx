"use client"

import { useState, useCallback } from "react"
import { CharacterSelect } from "@/components/character-select"
import { ModeSelect } from "@/components/mode-select"
import { CinematicLoader } from "@/components/cinematic-loader"
import { TacticalView } from "@/components/tactical-view"
import { AgentProfile } from "@/components/agent-profile"
import { CoreAbilities } from "@/components/core-abilities"
import { MissionLog } from "@/components/mission-log"
import { SquadsAlliances } from "@/components/squads-alliances"
import { ContactChannels } from "@/components/contact-channels"
import { BattleScreen } from "@/components/battle-screen"
import { VictoryScreen } from "@/components/victory-screen"
import { StatusBar } from "@/components/status-bar"
import { Scanlines } from "@/components/scanlines"
import { GridBackground } from "@/components/grid-background"
import { SoundToggle } from "@/components/sound-toggle"
import { HelpButton } from "@/components/help-button"
import { SoundProvider } from "@/hooks/use-sound"

export default function Home() {
  const [screen, setScreen] = useState<"character" | "mode" | "loading" | "tactical" | "profile" | "abilities" | "missions" | "alliances" | "contact" | "battle" | "victory">("character")
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [selectedModeLabel, setSelectedModeLabel] = useState<string>("")
  const [selectedModeId, setSelectedModeId] = useState<string>("")
  const [transitioning, setTransitioning] = useState(false)
  const [pageSource, setPageSource] = useState<"tactical" | "battle">("tactical")

  // Battle Mode score state (persists across battle-related page navigation)
  const [battleScore, setBattleScore] = useState(0)
  const [battleHitAvatars, setBattleHitAvatars] = useState<Set<number>>(new Set())
  const [victoryPending, setVictoryPending] = useState(false)

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

  const handleModeConfirmed = useCallback((modeId: string, modeLabel: string) => {
    setSelectedModeId(modeId)
    setSelectedModeLabel(modeLabel)
    setTransitioning(true)
    setTimeout(() => {
      setScreen("loading")
      setTransitioning(false)
    }, 500)
  }, [])

  const handleLoadingComplete = useCallback(() => {
    // Route to the correct destination based on selected mode
    setTransitioning(true)
    setTimeout(() => {
      if (selectedModeId === "tactical") {
        setScreen("tactical")
      } else if (selectedModeId === "combat") {
        setScreen("battle")
      } else {
        // Fallback: return to mode select for unbuilt modes
        setScreen("mode")
      }
      setTransitioning(false)
    }, 600)
  }, [selectedModeId])

  const handleTacticalBack = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("mode")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleModuleOpen = useCallback((moduleId: string) => {
    setPageSource("tactical")
    setTransitioning(true)
    setTimeout(() => {
      if (moduleId === "profile") {
        setScreen("profile")
      } else if (moduleId === "abilities") {
        setScreen("abilities")
      } else if (moduleId === "missions") {
        setScreen("missions")
      } else if (moduleId === "alliances" || moduleId === "squads") {
        setScreen("alliances")
      } else if (moduleId === "contact") {
        setScreen("contact")
      }
      setTransitioning(false)
    }, 600)
  }, [])

  const handleProfileBack = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("tactical")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleProfilePrev = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("contact")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleProfileNext = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("abilities")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleAbilitiesPrev = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("profile")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleAbilitiesNext = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("missions")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleAbilitiesBack = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("tactical")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleMissionsPrev = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("abilities")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleMissionsNext = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("alliances")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleMissionsBack = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("tactical")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleAlliancesPrev = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("missions")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleAlliancesNext = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("contact")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleAlliancesBack = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("tactical")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleContactPrev = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("alliances")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleContactNext = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("profile")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleContactBack = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen("tactical")
      setTransitioning(false)
    }, 600)
  }, [])

  const handleBattleBack = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      // Reset battle score and victoryPending when exiting battle mode
      setBattleScore(0)
      setBattleHitAvatars(new Set())
      setVictoryPending(false)
      setScreen("mode")
      setTransitioning(false)
    }, 600)
  }, [])

  // Generic "back to battle screen" handler for pages opened from Battle Mode
  const handleBackToBattle = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      // Check if victory is pending (score reached 100%)
      if (victoryPending) {
        // Redirect to victory screen instead of battle
        setScreen("victory")
      } else {
        setScreen("battle")
      }
      setTransitioning(false)
    }, 600)
  }, [victoryPending])

  const handleBattleNavigate = useCallback((page: string) => {
    const validScreens = ["profile", "abilities", "missions", "alliances", "contact"] as const
    type ValidScreen = typeof validScreens[number]
    if (validScreens.includes(page as ValidScreen)) {
      setPageSource("battle")
      setScreen(page as typeof screen)
    }
  }, [])

  // Called when score reaches 100% - sets pending flag instead of immediate redirect
  const handleVictory = useCallback(() => {
    setVictoryPending(true)
  }, [])

  const handleVictoryEscape = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      // Reset battle score and victoryPending when exiting victory screen
      setBattleScore(0)
      setBattleHitAvatars(new Set())
      setVictoryPending(false)
      setScreen("mode")
      setTransitioning(false)
    }, 600)
  }, [])

  return (
    <SoundProvider>
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6">
        {/* Background layers */}
        <GridBackground />
        <Scanlines />

        {/* Sound toggle + Help (hidden on screens that have their own) */}
        {screen !== "tactical" && screen !== "profile" && screen !== "abilities" && screen !== "missions" && screen !== "alliances" && screen !== "contact" && screen !== "battle" && (
          <div className="fixed right-6 top-6 z-50 flex items-center gap-3 sm:right-10 sm:top-10">
            <SoundToggle position="inline" />
            <HelpButton />
          </div>
        )}

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
          ) : screen === "mode" ? (
            <ModeSelect
              selectedRole={selectedRole}
              onBack={handleBack}
              onModeConfirmed={handleModeConfirmed}
            />
          ) : null}
        </div>

        {/* Cinematic loading overlay */}
        {screen === "loading" && (
          <CinematicLoader
            modeLabel={selectedModeLabel}
            onComplete={handleLoadingComplete}
          />
        )}

        {/* Tactical View (full-screen, renders above the shared background) */}
        {screen === "tactical" && (
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-700 ease-in-out ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <TacticalView
              selectedRole={selectedRole}
              onBack={handleTacticalBack}
              onModuleOpen={handleModuleOpen}
            />
          </div>
        )}

        {/* Agent Profile (full-screen, isolated) */}
        {screen === "profile" && (
          <div
            className={`fixed inset-0 z-50 transition-opacity duration-700 ease-in-out ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <AgentProfile
              onBack={pageSource === "battle" ? handleBackToBattle : handleProfileBack}
              onPrev={handleProfilePrev}
              onNext={handleProfileNext}
              source={pageSource}
            />
          </div>
        )}

        {/* Core Abilities (full-screen, isolated) */}
        {screen === "abilities" && (
          <div
            className={`fixed inset-0 z-50 transition-opacity duration-700 ease-in-out ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <CoreAbilities
              onPrev={handleAbilitiesPrev}
              onNext={handleAbilitiesNext}
              onBack={pageSource === "battle" ? handleBackToBattle : handleAbilitiesBack}
              source={pageSource}
            />
          </div>
        )}

        {/* Mission Log (full-screen, isolated) */}
        {screen === "missions" && (
          <div
            className={`fixed inset-0 z-50 transition-opacity duration-700 ease-in-out ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <MissionLog
              onPrev={handleMissionsPrev}
              onNext={handleMissionsNext}
              onBack={pageSource === "battle" ? handleBackToBattle : handleMissionsBack}
              source={pageSource}
            />
          </div>
        )}

        {/* Squads & Alliances (full-screen, isolated) */}
        {screen === "alliances" && (
          <div
            className={`fixed inset-0 z-50 transition-opacity duration-700 ease-in-out ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <SquadsAlliances
              onPrev={handleAlliancesPrev}
              onNext={handleAlliancesNext}
              onBack={pageSource === "battle" ? handleBackToBattle : handleAlliancesBack}
              source={pageSource}
            />
          </div>
        )}

        {/* Contact Channels (full-screen, isolated) */}
        {screen === "contact" && (
          <div
            className={`fixed inset-0 z-50 transition-opacity duration-700 ease-in-out ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <ContactChannels
              onPrev={handleContactPrev}
              onNext={handleContactNext}
              onBack={pageSource === "battle" ? handleBackToBattle : handleContactBack}
              source={pageSource}
            />
          </div>
        )}

        {/* Battle Screen (full-screen, FPS view) */}
        {screen === "battle" && (
          <div
            className={`fixed inset-0 z-50 transition-opacity duration-700 ease-in-out ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <BattleScreen 
              onBack={handleBattleBack} 
              onNavigate={handleBattleNavigate} 
              onVictory={handleVictory}
              score={battleScore}
              setScore={setBattleScore}
              hitAvatars={battleHitAvatars}
              setHitAvatars={setBattleHitAvatars}
            />
          </div>
        )}

        {/* Victory Screen */}
        {screen === "victory" && (
          <div
            className={`fixed inset-0 z-50 transition-opacity duration-700 ease-in-out ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <VictoryScreen onEscape={handleVictoryEscape} />
          </div>
        )}

        {/* Status bar */}
        <StatusBar />
      </main>
    </SoundProvider>
  )
}
