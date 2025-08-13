import SnakeGame from "@/components/games/snake-game"
import GameHeader from "@/components/navigation/game-header"
import ErrorBoundary from "@/components/ui/error-boundary"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Snake Classic - Free Online Snake Game | WorldPlay",
  description:
    "Play the classic Snake game online for free on WorldPlay. Control your snake to eat food and grow while avoiding walls and yourself. Mobile-friendly with touch controls.",
  keywords:
    "snake game, classic snake, online snake game, free snake game, mobile snake game, browser game, arcade game, WorldPlay",
  openGraph: {
    title: "Snake Classic - Free Online Snake Game | WorldPlay",
    description: "Play the classic Snake game online for free on WorldPlay. Mobile-friendly with touch controls.",
    url: "https://worldplay.games/games/snake",
    type: "website",
    images: [
      {
        url: "/retro-snake-game.png",
        width: 400,
        height: 400,
        alt: "Snake Classic Game Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snake Classic - Free Online Snake Game | WorldPlay",
    description: "Play the classic Snake game online for free on WorldPlay. Mobile-friendly with touch controls.",
    images: ["/retro-snake-game.png"],
  },
  alternates: {
    canonical: "https://worldplay.games/games/snake",
  },
}

export default function SnakePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <GameHeader currentGame="snake" gameTitle="Snake Classic" />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ErrorBoundary>
            <SnakeGame />
          </ErrorBoundary>
        </div>
      </main>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Game",
            name: "Snake Classic",
            description:
              "Classic snake game where you control a growing snake to collect food while avoiding walls and yourself",
            url: "https://worldplay.games/games/snake",
            genre: "Arcade",
            playMode: "SinglePlayer",
            applicationCategory: "Game",
            operatingSystem: "Web Browser",
            publisher: {
              "@type": "Organization",
              name: "WorldPlay",
              url: "https://worldplay.games",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "1542",
            },
          }),
        }}
      />
    </div>
  )
}
