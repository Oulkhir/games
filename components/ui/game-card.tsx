"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { Play, Clock, Star } from "lucide-react"
import Link from "next/link"

interface GameCardProps {
  game: {
    id: string
    title: string
    description: string
    category: string
    difficulty: string
    thumbnail: string
    available: boolean
    rating?: number
    playCount?: number
  }
}

export default function GameCard({ game }: GameCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Classic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Puzzle":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Arcade":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Action":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden touch-manipulation">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
          {/* Loading State */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner size="md" />
            </div>
          )}

          {/* Image */}
          <img
            src={imageError ? "/placeholder.svg?height=192&width=384&text=Game+Image" : game.thumbnail}
            alt={`${game.title} game thumbnail`}
            className={`w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true)
              setImageLoading(false)
            }}
          />

          {/* Badges */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <Badge className={`text-xs ${getCategoryColor(game.category)}`}>{game.category}</Badge>
          </div>
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <Badge className={`text-xs ${getDifficultyColor(game.difficulty)}`}>{game.difficulty}</Badge>
          </div>

          {/* Rating and Play Count */}
          {game.available && (
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-2">
              {game.rating && (
                <div className="flex items-center gap-1 bg-black/50 text-white px-1.5 sm:px-2 py-1 rounded text-xs">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                  <span>{game.rating}</span>
                </div>
              )}
              {game.playCount && (
                <div className="flex items-center gap-1 bg-black/50 text-white px-1.5 sm:px-2 py-1 rounded text-xs">
                  <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span className="hidden sm:inline">{game.playCount.toLocaleString()}</span>
                  <span className="sm:hidden">
                    {game.playCount > 1000 ? `${Math.floor(game.playCount / 1000)}k` : game.playCount}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Coming Soon Overlay */}
          {!game.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center text-white">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-80" />
                <Badge variant="outline" className="bg-white/90 text-gray-800 border-white/90 text-xs">
                  Coming Soon
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {game.title}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {game.description}
        </CardDescription>

        <Button
          asChild={game.available}
          disabled={!game.available}
          className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          {game.available ? (
            <Link href={`/games/${game.id}`} className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              <span className="font-medium">Play Now</span>
            </Link>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Coming Soon</span>
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
