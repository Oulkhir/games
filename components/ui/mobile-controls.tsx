"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RotateCw, Pause, Play } from "lucide-react"

interface MobileControlsProps {
  onDirectionPress: (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => void
  onRotate?: () => void
  onPause?: () => void
  gameState?: string
  showRotate?: boolean
  showPause?: boolean
  controlType?: "dpad" | "vertical" | "custom"
  customButtons?: Array<{
    icon: React.ReactNode
    label: string
    onPress: () => void
    variant?: "default" | "outline" | "secondary"
  }>
}

export default function MobileControls({
  onDirectionPress,
  onRotate,
  onPause,
  gameState,
  showRotate = false,
  showPause = false,
  controlType = "dpad",
  customButtons = [],
}: MobileControlsProps) {
  // Only show on mobile devices
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768

  if (!isMobile) return null

  const handleTouchStart = (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    onDirectionPress(direction)
  }

  if (controlType === "vertical") {
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="flex flex-col items-center gap-2 bg-black/80 backdrop-blur-sm rounded-2xl p-4">
          <Button
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 active:bg-white/40"
            onTouchStart={() => handleTouchStart("UP")}
            onMouseDown={() => handleTouchStart("UP")}
          >
            <ChevronUp className="w-8 h-8" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 active:bg-white/40"
            onTouchStart={() => handleTouchStart("DOWN")}
            onMouseDown={() => handleTouchStart("DOWN")}
          >
            <ChevronDown className="w-8 h-8" />
          </Button>
          {showPause && onPause && (
            <Button
              size="sm"
              variant="outline"
              className="mt-2 bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={onPause}
            >
              {gameState === "PLAYING" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 md:hidden">
      <div className="flex justify-between items-end px-4">
        {/* D-Pad Controls */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-1 bg-black/80 backdrop-blur-sm rounded-2xl p-3">
            {/* Top row */}
            <div></div>
            <Button
              size="lg"
              variant="outline"
              className="w-14 h-14 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 active:bg-white/40"
              onTouchStart={() => handleTouchStart("UP")}
              onMouseDown={() => handleTouchStart("UP")}
            >
              <ChevronUp className="w-6 h-6" />
            </Button>
            <div></div>

            {/* Middle row */}
            <Button
              size="lg"
              variant="outline"
              className="w-14 h-14 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 active:bg-white/40"
              onTouchStart={() => handleTouchStart("LEFT")}
              onMouseDown={() => handleTouchStart("LEFT")}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="w-14 h-14"></div>
            <Button
              size="lg"
              variant="outline"
              className="w-14 h-14 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 active:bg-white/40"
              onTouchStart={() => handleTouchStart("RIGHT")}
              onMouseDown={() => handleTouchStart("RIGHT")}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Bottom row */}
            <div></div>
            <Button
              size="lg"
              variant="outline"
              className="w-14 h-14 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 active:bg-white/40"
              onTouchStart={() => handleTouchStart("DOWN")}
              onMouseDown={() => handleTouchStart("DOWN")}
            >
              <ChevronDown className="w-6 h-6" />
            </Button>
            <div></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {showRotate && onRotate && (
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full bg-purple-600/80 border-purple-400/50 text-white hover:bg-purple-500/80 active:bg-purple-400/80"
              onTouchStart={onRotate}
              onMouseDown={onRotate}
            >
              <RotateCw className="w-8 h-8" />
            </Button>
          )}

          {customButtons.map((button, index) => (
            <Button
              key={index}
              size="lg"
              variant={button.variant || "outline"}
              className="w-16 h-16 rounded-full bg-blue-600/80 border-blue-400/50 text-white hover:bg-blue-500/80 active:bg-blue-400/80"
              onTouchStart={button.onPress}
              onMouseDown={button.onPress}
            >
              {button.icon}
            </Button>
          ))}

          {showPause && onPause && (
            <Button
              size="sm"
              variant="outline"
              className="bg-black/60 border-white/30 text-white hover:bg-black/80"
              onClick={onPause}
            >
              {gameState === "PLAYING" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
