import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import CookieConsent from "@/components/cookie-consent"
import "./globals.css"

export const metadata: Metadata = {
  title: "WorldPlay - Free 2D Browser Games | Classic Arcade Games Online",
  description:
    "Play classic 2D games like Snake, Tetris, Pong and more on WorldPlay. Free browser games with no downloads required. Mobile-friendly gaming experience with touch controls.",
  generator: "v0.app",
  keywords: [
    "WorldPlay",
    "free games",
    "browser games",
    "2D games",
    "classic games",
    "snake game online",
    "tetris game free",
    "pong game browser",
    "arcade games",
    "mobile games",
    "online games",
    "retro games",
    "puzzle games",
    "action games",
    "HTML5 games",
    "JavaScript games",
    "no download games",
    "instant play games",
    "classic arcade",
    "vintage games",
    "old school games",
    "pixel games",
    "touch control games",
    "smartphone games",
    "tablet games",
    "web games",
    "free online gaming",
    "browser gaming",
    "casual games",
    "family games",
  ].join(", "),
  authors: [{ name: "WorldPlay" }],
  creator: "WorldPlay",
  publisher: "WorldPlay",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://worldplay.games",
    title: "WorldPlay - Free 2D Browser Games | Classic Arcade Games Online",
    description:
      "Play classic 2D games like Snake, Tetris, Pong and more on WorldPlay. Free browser games with mobile support and no downloads required.",
    siteName: "WorldPlay",
    images: [
      {
        url: "/worldplay-og-image.png",
        width: 1200,
        height: 630,
        alt: "WorldPlay - Free Classic 2D Browser Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorldPlay - Free 2D Browser Games | Classic Arcade Games Online",
    description:
      "Play classic 2D games like Snake, Tetris, Pong and more on WorldPlay. Free browser games with mobile support and no downloads required.",
    images: ["/worldplay-twitter-card.png"],
    creator: "@WorldPlayGames",
  },
  alternates: {
    canonical: "https://worldplay.games",
  },
  category: "Games",
  classification: "Gaming Website",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#3b82f6",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "WorldPlay",
              alternateName: "WorldPlay Games",
              url: "https://worldplay.games",
              description:
                "Free classic 2D browser games including Snake, Tetris, Pong and more. Play instantly with no downloads required.",
              publisher: {
                "@type": "Organization",
                name: "WorldPlay",
                url: "https://worldplay.games",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://worldplay.games/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              mainEntity: {
                "@type": "ItemList",
                name: "Free Browser Games",
                description: "Collection of classic 2D games playable in browser",
                itemListElement: [
                  {
                    "@type": "Game",
                    name: "Snake Classic",
                    description: "Classic snake game where you control a growing snake to collect food",
                    url: "https://worldplay.games/games/snake",
                    genre: "Arcade",
                    playMode: "SinglePlayer",
                    applicationCategory: "Game",
                  },
                  {
                    "@type": "Game",
                    name: "Block Puzzle",
                    description: "Tetris-inspired puzzle game where you arrange falling blocks",
                    url: "https://worldplay.games/games/tetris",
                    genre: "Puzzle",
                    playMode: "SinglePlayer",
                    applicationCategory: "Game",
                  },
                  {
                    "@type": "Game",
                    name: "Pong Classic",
                    description: "Original arcade tennis game with paddle and ball",
                    url: "https://worldplay.games/games/pong",
                    genre: "Sports",
                    playMode: "SinglePlayer",
                    applicationCategory: "Game",
                  },
                ],
              },
            }),
          }}
        />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
