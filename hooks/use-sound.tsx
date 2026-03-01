"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  playClick: () => void
  playTactical: () => void
  playCombat: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const AMBIENT_VOLUME = 0.17
const FADE_DURATION = 1200 // ms
const FADE_STEPS = 30

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  const ambientRef = useRef<HTMLAudioElement | null>(null)
  const clickRef = useRef<HTMLAudioElement | null>(null)
  const tacticalRef = useRef<HTMLAudioElement | null>(null)
  const combatRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Initialise audio elements once on mount
  useEffect(() => {
    const ambient = new Audio("/audio/ambient-hum.mp3")
    ambient.loop = true
    ambient.volume = 0
    ambient.preload = "auto"
    ambientRef.current = ambient

    const click = new Audio("/audio/ui-click.mp3")
    click.volume = 0.35
    click.preload = "auto"
    clickRef.current = click

    const tactical = new Audio("/audio/tactical-select.mp3")
    tactical.volume = 0.45
    tactical.preload = "auto"
    tacticalRef.current = tactical

    const combat = new Audio("/audio/combat-select.mp3")
    combat.volume = 0.45
    combat.preload = "auto"
    combatRef.current = combat

    return () => {
      ambient.pause()
      ambient.src = ""
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    }
  }, [])

  // Fade ambient in/out when enabled changes
  useEffect(() => {
    const ambient = ambientRef.current
    if (!ambient) return

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }

    if (enabled) {
      // Fade in
      ambient.play().catch(() => {
        /* user hasn't interacted yet – toggle will retry */
      })
      const stepTime = FADE_DURATION / FADE_STEPS
      const volumeStep = AMBIENT_VOLUME / FADE_STEPS
      fadeIntervalRef.current = setInterval(() => {
        if (ambient.volume + volumeStep >= AMBIENT_VOLUME) {
          ambient.volume = AMBIENT_VOLUME
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
          fadeIntervalRef.current = null
        } else {
          ambient.volume = Math.min(ambient.volume + volumeStep, AMBIENT_VOLUME)
        }
      }, stepTime)
    } else {
      // Fade out
      const stepTime = FADE_DURATION / FADE_STEPS
      const volumeStep = ambient.volume / FADE_STEPS
      if (ambient.volume <= 0) {
        ambient.pause()
        return
      }
      fadeIntervalRef.current = setInterval(() => {
        if (ambient.volume - volumeStep <= 0.001) {
          ambient.volume = 0
          ambient.pause()
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
          fadeIntervalRef.current = null
        } else {
          ambient.volume = Math.max(ambient.volume - volumeStep, 0)
        }
      }, stepTime)
    }
  }, [enabled])

  const playSfx = useCallback(
    (ref: React.RefObject<HTMLAudioElement | null>) => {
      if (!enabled || !ref.current) return
      const audio = ref.current
      audio.currentTime = 0
      audio.play().catch(() => {})
    },
    [enabled]
  )

  const toggle = useCallback(() => setEnabled((prev) => !prev), [])
  const playClick = useCallback(() => playSfx(clickRef), [playSfx])
  const playTactical = useCallback(() => playSfx(tacticalRef), [playSfx])
  const playCombat = useCallback(() => playSfx(combatRef), [playSfx])

  return (
    <SoundContext.Provider value={{ enabled, toggle, playClick, playTactical, playCombat }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error("useSound must be used within <SoundProvider>")
  return ctx
}
