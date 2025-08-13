import PongGame from "@/components/games/pong-game"
import GameHeader from "@/components/navigation/game-header"
import ErrorBoundary from "@/components/ui/error-boundary"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pong Classic - Free Online Pong Game | WorldPlay",
  description:
    "Play Pong Classic, the original arcade tennis game online for free on WorldPlay. Control your paddle to bounce the ball past your opponent. Mobile-friendly with touch controls.",
  keywords:
    "pong game, classic pong, online pong game, free pong game, mobile pong, arcade game, tennis game, WorldPlay",
  openGraph: {
    title: "Pong Classic - Free Online Pong Game | WorldPlay",
    description:
      "Play Pong Classic, the original arcade tennis game online for free on WorldPlay. Mobile-friendly with touch controls.",
    url: "https://worldplay.games/games/pong",
    type: "website",
    images: [
      {
        url: "/retro-pong.png",
        width: 400,
        height: 400,
        alt: "Pong Classic Game Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pong Classic - Free Online Pong Game | WorldPlay",
    description:
      "Play Pong Classic, the original arcade tennis game online for free on WorldPlay. Mobile-friendly with touch controls.",
    images: ["/retro-pong.png"],
  },
  alternates: {
    canonical: "https://worldplay.games/games/pong",
  },
}

export default function PongPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <GameHeader currentGame="pong" gameTitle="Pong Classic" />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ErrorBoundary>
            <PongGame />
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
            name: "Pong Classic",
            description:
              "Original arcade tennis game where you control your paddle to bounce the ball past your opponent",
            url: "https://worldplay.games/games/pong",
            genre: "Sports",
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
              ratingValue: "4.6",
              ratingCount: "893",
            },
          }),
        }}
      />
    </div>
  )
}
