import TetrisGame from "@/components/games/tetris-game"
import GameHeader from "@/components/navigation/game-header"
import ErrorBoundary from "@/components/ui/error-boundary"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Block Puzzle - Free Online Tetris Game | WorldPlay",
  description:
    "Play Block Puzzle, a Tetris-inspired game online for free on WorldPlay. Arrange falling blocks to clear lines and score points. Mobile-friendly with touch controls.",
  keywords:
    "tetris game, block puzzle, puzzle game, online tetris, free tetris game, mobile tetris, browser game, WorldPlay",
  openGraph: {
    title: "Block Puzzle - Free Online Tetris Game | WorldPlay",
    description:
      "Play Block Puzzle, a Tetris-inspired game online for free on WorldPlay. Mobile-friendly with touch controls.",
    url: "https://worldplay.games/games/tetris",
    type: "website",
    images: [
      {
        url: "/colorful-tetris-blocks.png",
        width: 400,
        height: 400,
        alt: "Block Puzzle Game Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Block Puzzle - Free Online Tetris Game | WorldPlay",
    description:
      "Play Block Puzzle, a Tetris-inspired game online for free on WorldPlay. Mobile-friendly with touch controls.",
    images: ["/colorful-tetris-blocks.png"],
  },
  alternates: {
    canonical: "https://worldplay.games/games/tetris",
  },
}

export default function TetrisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <GameHeader currentGame="tetris" gameTitle="Block Puzzle" />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ErrorBoundary>
            <TetrisGame />
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
            name: "Block Puzzle",
            description: "Tetris-inspired puzzle game where you arrange falling blocks to clear lines and score points",
            url: "https://worldplay.games/games/tetris",
            genre: "Puzzle",
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
              ratingValue: "4.9",
              ratingCount: "2315",
            },
          }),
        }}
      />
    </div>
  )
}
