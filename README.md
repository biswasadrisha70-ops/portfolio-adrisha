<div align="center">

# Agent: Adrisha Biswas | Tactical Portfolio

**A game-inspired, immersive portfolio experience built as a tactical command interface.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://vercel.com/)

---

</div>

## Project Overview

This is not a traditional portfolio. It is an **interactive, game-inspired tactical interface** where visitors assume the role of an operative navigating through a classified dossier. Every section of the portfolio -- Profile, Strengths, Mission Log, Alliances, and Contact -- is unlocked through one of two immersive modes:

- **Tactical View** -- A strategic HUD overview where clickable module tiles reveal each section of the portfolio.
- **Battle Mode** -- An FPS-style combat arena where visitors aim a crosshair and shoot avatar targets to unlock portfolio pages, complete with laser effects, score tracking, and a victory sequence.

The experience is wrapped in a cinematic sci-fi aesthetic featuring animated scanlines, glow effects, sound design, and smooth page transitions.

---

## Features

| Feature | Description |
|---|---|
| **Character Selection** | Choose your operative role before entering the command interface |
| **Dual Navigation Modes** | Tactical View (strategic HUD) and Battle Mode (FPS combat arena) |
| **Interactive Battle System** | Aim and shoot avatar targets with laser effects, hit detection, and dissolve animations |
| **Score Progression** | Track your elimination progress with a visual score bar that fills toward 100% |
| **Victory Sequence** | Cinematic victory screen triggered after all targets are neutralized |
| **Tactical HUD Interface** | Orbital module layout with animated rings, glowing tiles, and status indicators |
| **Page Navigation Arrows** | Cycle between portfolio sections using lateral navigation arrows |
| **Cinematic Loading Screen** | Animated loading transition with typing effects between mode changes |
| **Sound System** | Toggleable ambient sound effects and interaction audio |
| **Help System** | In-context help modal accessible from every screen via a portalled overlay |
| **Animated Scanlines** | Static scanline pattern with a slow-moving scan sweep for CRT display immersion |
| **Hover Glow Effects** | Interactive buttons emit a soft glow on hover for tactile feedback |
| **Ambient Panel Glow** | Breathing glow animations behind HUD panels and the status bar |
| **Smooth Page Transitions** | Fade-in entrance animations with scale and blur effects on every screen change |
| **Responsive Design** | Adapts to desktop, tablet, and mobile viewports |

---

## How to Use

### 1. Choose Your Role

On the landing screen, select your operative identity. This determines the persona carried throughout the interface.

### 2. Select a Mode

After role selection, two mode cards are presented:

- **Tactical View** -- Click to enter the strategic HUD. From there, click any module tile (Profile, Strengths, Missions, Alliances, Contact) to open that section.
- **Combat Simulation** -- Click to enter the FPS battle arena.

### 3. Battle Mode Interaction

In Battle Mode, five avatar targets stand on a battlefield, each labeled with a portfolio section name:

- Move your crosshair over a target and **click to fire**.
- A laser beam fires, the avatar dissolves, and you are taken to that portfolio page.
- Your score bar fills with each successful hit.
- After viewing the page, returning to battle continues the fight.

### 4. Navigating Portfolio Pages

- Use the **Back** button (top-left) to return to the previous view.
- In Tactical View mode, use **left/right arrows** on each page to cycle between sections.
- The **Help** button (top-right) opens a mission briefing overlay explaining controls.

### 5. Victory Screen

Once all five targets have been hit and your score reaches 100%, returning from the final page triggers the **Victory Screen**. Press **ESC** (or the on-screen button) to return to Mode Selection.

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js 16** | App framework with App Router, server components, and optimized bundling via Turbopack |
| **React 19** | Component architecture, state management, hooks, and portals |
| **Tailwind CSS 4** | Utility-first styling with custom design tokens, responsive breakpoints, and CSS animations |
| **TypeScript** | Type-safe development across all components and hooks |
| **Canvas API** | Real-time rendering of the battle arena background, laser beams, and particle effects |
| **CSS Animations** | Scanline overlays, ambient glow breathing, hover effects, page entrance transitions |
| **Lucide React** | Consistent icon system throughout the interface |
| **Radix UI** | Accessible primitive components for UI foundations |
| **Google Fonts** | JetBrains Mono (monospace HUD text), Inter (body), Orbitron (display headings) |

---

## Project Structure

```
app/
  layout.tsx            # Root layout with fonts, metadata, and viewport config
  page.tsx              # Main orchestrator -- manages all screen states and transitions
  globals.css           # Design tokens, Tailwind config, and custom CSS animations

components/
  character-select.tsx  # Role selection landing screen
  mode-select.tsx       # Tactical / Combat mode picker
  cinematic-loader.tsx  # Animated loading transition between modes
  tactical-view.tsx     # Strategic HUD with orbital module layout
  tactical-hud-frame.tsx# Reusable HUD panel frame with ambient glow
  battle-screen.tsx     # FPS battle arena with canvas rendering and hit detection
  agent-profile.tsx     # Profile portfolio page
  core-abilities.tsx    # Strengths / skills portfolio page
  mission-log.tsx       # Projects / experience portfolio page
  squads-alliances.tsx  # Collaborations portfolio page
  contact-channels.tsx  # Contact information portfolio page
  victory-screen.tsx    # Cinematic victory sequence
  status-bar.tsx        # Persistent bottom status bar
  scanlines.tsx         # CRT scanline overlay with moving scan sweep
  grid-background.tsx   # Animated grid background layer
  help-button.tsx       # Portalled help modal accessible from all screens
  sound-toggle.tsx      # Sound on/off toggle button
  role-icons.tsx        # SVG role icons for character selection
  tilt-card.tsx         # 3D tilt interaction card component

hooks/
  use-sound.tsx         # Sound provider context and audio playback hook

lib/
  utils.ts              # Shared utilities (cn classname helper)
```

---

## Unique Design Concept

This portfolio breaks away from the conventional scrollable resume format by presenting professional information as a **playable experience**:

- **Game-Inspired Exploration** -- Visitors don't just read; they interact, aim, and navigate through a tactical interface that rewards engagement.
- **Dual-Path Discovery** -- The strategic Tactical View and the action-oriented Battle Mode offer two distinct ways to explore the same content, catering to different user preferences.
- **Immersive Storytelling** -- Every element -- from the CRT scanlines to the breathing glow effects to the cinematic loading screens -- is designed to sustain the illusion of a classified operations interface, making the portfolio memorable long after the visit.

---

## Installation / Running Locally

```bash
# Clone the repository
git clone https://github.com/biswasadrisha70-ops/portfolio-adrisha.git

# Navigate to the project directory
cd portfolio-adrisha

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

---

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). Simply connect the GitHub repository to a Vercel project and it will build and deploy automatically on every push.

```bash
# Or deploy via the Vercel CLI
npx vercel
```

---

## Links

| | Link |
|---|---|
| **Live Portfolio** | [Coming Soon](#) |
| **GitHub Repository** | [github.com/biswasadrisha70-ops/portfolio-adrisha](https://github.com/biswasadrisha70-ops/portfolio-adrisha) |
| **LinkedIn** | [linkedin.com/in/adrisha-biswas](#) |

---

## License

This project is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 Adrisha Biswas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Built with precision by Adrisha Biswas.**

</div>
