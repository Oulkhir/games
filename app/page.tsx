"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import GameFilter from "@/components/navigation/game-filter"
import GameCard from "@/components/ui/game-card"
import MobileNav from "@/components/ui/mobile-nav"
import { Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

const games = [
  {
    id: "snake",
    title: "Snake Classic",
    description:
      "The timeless arcade game where you control a growing snake to collect food while avoiding walls and yourself.",
    category: "Classic",
    difficulty: "Easy",
    thumbnail: "/retro-snake-game.png",
    available: true,
    rating: 4.8,
    playCount: 15420,
  },
  {
    id: "tetris",
    title: "Block Puzzle",
    description: "A Tetris-inspired puzzle game where you arrange falling blocks to clear lines and score points.",
    category: "Puzzle",
    difficulty: "Medium",
    thumbnail: "/colorful-tetris-blocks.png",
    available: true,
    rating: 4.9,
    playCount: 23150,
  },
  {
    id: "pong",
    title: "Pong Classic",
    description: "The original arcade tennis game. Control your paddle to bounce the ball past your opponent.",
    category: "Classic",
    difficulty: "Easy",
    thumbnail: "/retro-pong.png",
    available: true,
    rating: 4.6,
    playCount: 8930,
  },
  {
    id: "breakout",
    title: "Brick Breaker",
    description: "Break all the bricks with your ball and paddle in this classic arcade game.",
    category: "Arcade",
    difficulty: "Medium",
    thumbnail: "/brick-breaker-colorful-blocks.png",
    available: false,
  },
  {
    id: "asteroids",
    title: "Space Rocks",
    description: "Navigate your spaceship through an asteroid field in this space shooter classic.",
    category: "Action",
    difficulty: "Hard",
    thumbnail: "/space-asteroids-game-spaceship.png",
    available: false,
  },
  {
    id: "pacman",
    title: "Dot Collector",
    description: "Navigate mazes, collect dots, and avoid ghosts in this maze-running adventure.",
    category: "Classic",
    difficulty: "Medium",
    thumbnail: "/pacman-maze-dots.png",
    available: false,
  },
]

const categories = ["All", "Classic", "Puzzle", "Arcade", "Action"]

const stats = [
  { icon: Users, label: "Active Players", value: "47.5K+", color: "text-blue-600" },
  { icon: Zap, label: "Games Played", value: "2.1M+", color: "text-green-600" },
  { icon: TrendingUp, label: "Average Rating", value: "4.8/5", color: "text-yellow-600" },
  { icon: Sparkles, label: "New This Month", value: "3", color: "text-purple-600" },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter games based on category and search
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory = selectedCategory === "All" || game.category === selectedCategory
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const availableGames = games.filter((game) => game.available)
  const totalPlays = availableGames.reduce((sum, game) => sum + (game.playCount || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WorldPlay
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">WorldPlay - Free Browser Games, No Downloads Required</span>
            <span className="sm:hidden">Free Browser Games</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WorldPlay
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the golden age of gaming with WorldPlay's collection of classic 2D games. Play instantly on any
            device - desktop, tablet, or mobile!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center"
              >
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <GameFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalGames={games.length}
            filteredGames={filteredGames.length}
          />
        </div>
      </section>

      {/* Games Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">No games found</h3>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                variant="outline"
                className="hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Games Section */}
              {selectedCategory === "All" && searchQuery === "" && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Most Popular</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {availableGames
                      .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
                      .slice(0, 3)
                      .map((game) => (
                        <GameCard key={`featured-${game.id}`} game={game} />
                      ))}
                  </div>
                </div>
              )}

              {/* All Games Section */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCategory === "All" ? "All Games" : `${selectedCategory} Games`}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} available
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      {selectedCategory === "All" && searchQuery === "" && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">More Games Coming Soon!</h3>
            <p className="text-lg sm:text-xl opacity-90 mb-8">
              We're constantly adding new classic games to our collection. Stay tuned for more retro gaming fun!
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="/about">Learn More</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/contact">Suggest a Game</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* AdSense Compliant Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-lg">W</span>
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  WorldPlay
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                WorldPlay is your ultimate destination for classic 2D games. All games are free to play and optimized
                for both desktop and mobile devices.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span>{totalPlays.toLocaleString()} total plays</span>
                <span className="hidden sm:inline">•</span>
                <span>{availableGames.length} games available</span>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Game Categories</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Classic Arcade</span>
                </li>
                <li>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Puzzle Games</span>
                </li>
                <li>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Action Games</span>
                </li>
                <li>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Retro Collection</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              © 2024 WorldPlay. All rights reserved. Games are original implementations of classic gaming concepts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
