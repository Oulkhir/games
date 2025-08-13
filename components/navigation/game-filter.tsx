"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"

interface GameFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  totalGames: number
  filteredGames: number
}

export default function GameFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalGames,
  filteredGames,
}: GameFilterProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const clearFilters = () => {
    onCategoryChange("All")
    onSearchChange("")
    setIsSearchVisible(false)
  }

  const hasActiveFilters = selectedCategory !== "All" || searchQuery.length > 0

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Filter className="w-4 h-4" />
          <span>
            Showing {filteredGames} of {totalGames} games
          </span>
        </div>
      </div>

      {/* Search Input */}
      {isSearchVisible && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className="px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {selectedCategory !== "All" && (
            <Badge variant="outline" className="flex items-center gap-1">
              Category: {selectedCategory}
              <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => onCategoryChange("All")} />
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => onSearchChange("")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
