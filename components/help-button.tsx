"use client"

import { useState } from "react"

/**
 * Self-contained Help button + modal.
 * Drop into any page – renders the "?" button inline (no fixed positioning)
 * and a fullscreen modal overlay when opened.
 */
export function HelpButton() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowHelp(true)}
        className="group relative flex cursor-pointer items-center gap-1.5 rounded border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-500 border-[rgba(0,200,255,0.4)] bg-[rgba(5,15,25,0.6)] text-[#00CFFF] hover:border-[rgba(0,200,255,0.7)] hover:bg-[rgba(5,15,25,0.8)]"
        style={{
          boxShadow: "0 0 8px rgba(0,200,255,0.15), inset 0 0 6px rgba(0,200,255,0.08)",
          textShadow: "0 0 4px rgba(0,200,255,0.5)",
        }}
        aria-label="Open help panel"
      >
        <span style={{ fontSize: "12px", fontWeight: 700 }}>?</span>
        <span>Help</span>
        <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-[rgba(0,200,255,0.5)]" />
        <span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-[rgba(0,200,255,0.5)]" />
        <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-[rgba(0,200,255,0.5)]" />
        <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[rgba(0,200,255,0.5)]" />
      </button>

      {showHelp && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowHelp(false)}
        >
          <div
            className="relative mx-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg border font-mono"
            style={{
              borderColor: "rgba(0,200,255,0.4)",
              background: "linear-gradient(180deg, rgba(5,12,25,0.97), rgba(3,8,18,0.97))",
              boxShadow: "0 0 30px rgba(0,200,255,0.15), inset 0 0 20px rgba(0,200,255,0.05)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowHelp(false)}
              className="absolute right-3 top-3 flex cursor-pointer items-center justify-center rounded transition-colors duration-300"
              style={{
                width: 28, height: 28,
                color: "#00CFFF",
                border: "1px solid rgba(0,200,255,0.3)",
                background: "rgba(0,200,255,0.05)",
              }}
              aria-label="Close help panel"
            >
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>

            <div className="p-6 sm:p-8">
              <h2
                className="mb-6 text-center text-sm uppercase tracking-[0.3em]"
                style={{ color: "#00CFFF", textShadow: "0 0 8px rgba(0,200,255,0.4)" }}
              >
                Mission Briefing
              </h2>

              <div className="flex flex-col gap-5 text-[11px] leading-relaxed tracking-wide text-white/70">
                <section>
                  <h3 className="mb-1.5 text-xs uppercase tracking-[0.2em]" style={{ color: "#00CFFF" }}>
                    Mode Selection
                  </h3>
                  <p>
                    After choosing your role, you are presented with two modes.
                    Click a mode card to enter either <strong className="text-white/90">Tactical View</strong> or <strong className="text-white/90">Combat Simulation (Battle Mode)</strong>.
                  </p>
                </section>

                <section>
                  <h3 className="mb-1.5 text-xs uppercase tracking-[0.2em]" style={{ color: "#00CFFF" }}>
                    Tactical View
                  </h3>
                  <p>
                    A strategic HUD overview. Click on any module tile to open the corresponding page -- Profile, Strengths, Missions, Alliances, or Contact.
                    Use the side arrows to navigate between pages.
                  </p>
                </section>

                <section>
                  <h3 className="mb-1.5 text-xs uppercase tracking-[0.2em]" style={{ color: "#00CFFF" }}>
                    Battle Mode
                  </h3>
                  <p>
                    An FPS-style combat arena. Five avatar targets stand on the battlefield, each labeled with a page name.
                    Aim your crosshair and <strong className="text-white/90">click an avatar to shoot</strong>. The laser will fire, the avatar dissolves, and you are taken to that page.
                  </p>
                </section>

                <section>
                  <h3 className="mb-1.5 text-xs uppercase tracking-[0.2em]" style={{ color: "#00CFFF" }}>
                    Navigation
                  </h3>
                  <p>
                    Use the glowing <strong className="text-white/90">Back</strong> button in the top-left corner to return to the previous screen.
                    From Battle Mode it returns to Mode Selection. From inner pages it returns to the view you came from.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
