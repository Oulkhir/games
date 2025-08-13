"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, Menu, Gamepad2, Home, ChevronRight } from "lucide-react"

interface Game {
  id: string
  title: string
  category: string
  available: boolean
}

const games: Game[] = [
  { id: "snake", title: "Snake Classic", category: "Classic", available: true },
  { id: "tetris", title: "Block Puzzle", category: "Puzzle", available: true },
  { id: "pong", title: "Pong Classic", category: "Classic", available: true },
  { id: "breakout", title: "Brick Breaker", category: "Arcade", available: false },
  { id: "asteroids", title: "Space Rocks", category: "Action", available: false },
  { id: "pacman", title: "Dot Collector", category: "Classic", available: false },
]

interface GameHeaderProps {
  currentGame: string
  gameTitle: string
}

export default function GameHeader({ currentGame, gameTitle }: GameHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const availableGames = games.filter((game) => game.available && game.id !== currentGame)

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Back button and breadcrumbs */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Games</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>

            {/* Breadcrumbs */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                <Home className="w-3 h-3" />
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 dark:text-white font-medium">{gameTitle}</span>
            </div>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{gameTitle}</h1>
          </div>

          {/* Right side - Game switcher and menu */}
          <div className="flex items-center space-x-4">
            {/* Quick Game Switcher */}
            <div className="hidden lg:flex items-center space-x-2">
              {availableGames.slice(0, 2).map((game) => (
                <Button key={game.id} variant="outline" size="sm" asChild>
                  <Link href={`/games/${game.id}`} className="flex items-center gap-2">
                    <Gamepad2 className="w-3 h-3" />
                    {game.title}
                  </Link>
                </Button>
              ))}
            </div>

            {/* Game Menu Dropdown */}
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Menu className="w-4 h-4" />
                  <span className="hidden sm:inline">More Games</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Switch Games</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Jump to another game</p>
                </div>
                <DropdownMenuSeparator />
                {availableGames.map((game) => (
                  <DropdownMenuItem key={game.id} asChild>
                    <Link href={`/games/${game.id}`} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4" />
                        <span>{game.title}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {game.category}
                      </Badge>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>All Games</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
