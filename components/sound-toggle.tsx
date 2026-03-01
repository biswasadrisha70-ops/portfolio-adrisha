"use client"

import { useSound } from "@/hooks/use-sound"

export function SoundToggle() {
  const { enabled, toggle, playClick } = useSound()

  return (
    <button
      onClick={() => {
        playClick()
        toggle()
      }}
      className={`group fixed right-6 top-6 z-50 flex cursor-pointer items-center gap-2.5 rounded border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] backdrop-blur-sm transition-all duration-500 sm:right-10 sm:top-10 ${
        enabled
          ? "border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/15"
          : "border-border/40 bg-card/40 text-muted-foreground/50 hover:border-border/60 hover:text-muted-foreground/80"
      }`}
      aria-label={enabled ? "Disable sounds" : "Enable sounds"}
      aria-pressed={enabled}
    >
      {/* Speaker icon */}
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        {/* Speaker body */}
        <path
          d="M3 7.5h2.5L9 4.5v11L5.5 12.5H3a1 1 0 01-1-1v-3a1 1 0 011-1z"
          fill="currentColor"
          opacity={enabled ? 1 : 0.4}
          className="transition-opacity duration-300"
        />
        {enabled ? (
          <>
            {/* Sound waves */}
            <path
              d="M12 7c.8.8 1.2 1.9 1.2 3s-.4 2.2-1.2 3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M14.5 5c1.3 1.3 2 3.1 2 5s-.7 3.7-2 5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.4"
            />
          </>
        ) : (
          /* Mute X */
          <path
            d="M13 7.5l4 5m0-5l-4 5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
        )}
      </svg>
      <span>{enabled ? "Sound On" : "Sound Off"}</span>

      {/* Corner accents */}
      <span className={`absolute -left-px -top-px h-2 w-2 border-l border-t transition-colors duration-500 ${enabled ? "border-primary/50" : "border-border/30"}`} />
      <span className={`absolute -right-px -top-px h-2 w-2 border-r border-t transition-colors duration-500 ${enabled ? "border-primary/50" : "border-border/30"}`} />
      <span className={`absolute -bottom-px -left-px h-2 w-2 border-b border-l transition-colors duration-500 ${enabled ? "border-primary/50" : "border-border/30"}`} />
      <span className={`absolute -bottom-px -right-px h-2 w-2 border-b border-r transition-colors duration-500 ${enabled ? "border-primary/50" : "border-border/30"}`} />
    </button>
  )
}
