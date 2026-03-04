"use client"

import type { ReactNode } from "react"

interface TacticalHudFrameProps {
  children: ReactNode
  className?: string
  /** Optional glow intensity 0-1 */
  glowIntensity?: number
}

/**
 * Angular HUD-style frame with beveled corners, red border lines,
 * and subtle corner brackets. Used to wrap tactical panels.
 */
export function TacticalHudFrame({
  children,
  className = "",
  glowIntensity = 0.3,
}: TacticalHudFrameProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        clipPath:
          "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
      }}
    >
      {/* Backdrop fill */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(11, 11, 15, 0.85)",
          backdropFilter: "blur(12px)",
        }}
      />

      {/* Border glow */}
      <div
        className="absolute inset-0"
        style={{
          clipPath:
            "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
          boxShadow: `inset 0 0 20px rgba(180,50,50,${glowIntensity * 0.15}), 0 0 30px rgba(180,50,50,${glowIntensity * 0.08})`,
          border: `1px solid rgba(180,50,50,${glowIntensity * 0.4})`,
        }}
      />

      {/* Corner accents */}
      {/* Top-left */}
      <div className="absolute left-0 top-0">
        <div className="absolute left-[12px] top-0 h-px w-5 bg-danger/40" />
        <div className="absolute left-0 top-[12px] h-5 w-px bg-danger/40" />
      </div>
      {/* Top-right */}
      <div className="absolute right-0 top-0">
        <div className="absolute right-[12px] top-0 h-px w-5 bg-danger/40" />
        <div className="absolute right-0 top-[12px] h-5 w-px bg-danger/40" />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-0 left-0">
        <div className="absolute bottom-0 left-[12px] h-px w-5 bg-danger/40" />
        <div className="absolute bottom-[12px] left-0 h-5 w-px bg-danger/40" />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-0 right-0">
        <div className="absolute bottom-0 right-[12px] h-px w-5 bg-danger/40" />
        <div className="absolute bottom-[12px] right-0 h-5 w-px bg-danger/40" />
      </div>

      {/* Ambient glow aura behind panel */}
      <div
        aria-hidden="true"
        className="animate-ambient-glow pointer-events-none absolute -inset-3 -z-10"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 50%, rgba(180,50,50,${glowIntensity * 0.12}) 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
