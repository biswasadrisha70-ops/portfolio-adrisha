"use client"

import { useEffect, useState } from "react"

export function StatusBar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-border/40 bg-background/80 px-6 py-3 font-mono text-xs text-muted-foreground backdrop-blur-sm">
      {/* Subtle ambient glow above status bar */}
      <div
        aria-hidden="true"
        className="animate-ambient-glow-delayed pointer-events-none absolute -top-4 left-0 right-0 h-8"
        style={{
          background: "linear-gradient(to top, rgba(0,200,255,0.03) 0%, transparent 100%)",
        }}
      />
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span>SYSTEM ONLINE</span>
        </span>
        <span className="text-border">|</span>
        <span>CLEARANCE: CLASSIFIED</span>
      </div>
      <div className="flex items-center gap-4">
        <span>SECTOR 7G</span>
        <span className="text-border">|</span>
        <time dateTime={time}>{time || "--:--:--"}</time>
      </div>
    </div>
  )
}
