import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Inter, Orbitron } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next' // Temporarily disabled
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });
const _orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: 'Agent: Adrisha Biswas | Tactical Portfolio',
  description: 'Tactical Portfolio Interface for Agent Adrisha Biswas. Access the dossier.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {/* <Analytics /> */} {/* Temporarily disabled */}
      </body>
    </html>
  )
}
