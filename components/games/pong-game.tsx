"use client"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Trophy, Gamepad2, Settings } from "lucide-react"
import MobileControls from "@/components/ui/mobile-controls"

// Types and constants
type Difficulty = "Easy" | "Medium" | "Hard"
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const WINNING_SCORE = 10

export default function PongGame() {
  // State declarations
  const [gameState, setGameState] = useState<"PLAYING" | "PAUSED" | "MENU" | "GAME_OVER">("MENU")
  const [playerScore, setPlayerScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy")
  const [highScore, setHighScore] = useState(0)
  const [playerPaddle, setPlayerPaddle] = useState({
    x: 50,
    y: CANVAS_HEIGHT / 2 - 50,
    width: 10,
    height: 100,
    speed: 5,
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleDirectionPress = useCallback(
    (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
      if (gameState !== "PLAYING") return

      setPlayerPaddle((prev) => {
        let newY = prev.y

        if (direction === "UP") {
          newY = Math.max(prev.y - prev.speed * 2, 0)
        } else if (direction === "DOWN") {
          newY = Math.min(prev.y + prev.speed * 2, CANVAS_HEIGHT - prev.height)
        }

        return { ...prev, y: newY }
      })
    },
    [gameState],
  )

  const handlePause = useCallback(() => {
    if (gameState === "PLAYING") {
      setGameState("PAUSED")
    } else if (gameState === "PAUSED") {
      setGameState("PLAYING")
    }
  }, [gameState])

  const startNewGame = useCallback(() => {
    setGameState("PLAYING")
    setPlayerScore(0)
    setAiScore(0)
  }, [])

  const resetGame = useCallback(() => {
    setGameState("MENU")
    setPlayerScore(0)
    setAiScore(0)
    setHighScore(0)
  }, [])

  // ... existing code (all game logic remains the same) ...

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Game Canvas */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-cyan-600" />
                Pong Classic
              </CardTitle>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  {playerScore} - {aiScore}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-800 max-w-full h-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Game State Overlay - same as before */}
              {gameState !== "PLAYING" && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white">
                    {gameState === "MENU" && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Pong Classic</h3>
                        <p className="text-gray-300">First to {WINNING_SCORE} points wins!</p>
                        <div className="space-y-2">
                          <div className="flex justify-center gap-2">
                            {(["Easy", "Medium", "Hard"] as Difficulty[]).map((diff) => (
                              <Button
                                key={diff}
                                variant={difficulty === diff ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDifficulty(diff)}
                                className="text-xs"
                              >
                                {diff}
                              </Button>
                            ))}
                          </div>
                          <Button onClick={startNewGame} className="bg-cyan-600 hover:bg-cyan-700">
                            <Play className="w-4 h-4 mr-2" />
                            Start Game
                          </Button>
                        </div>
                      </div>
                    )}
                    {gameState === "PAUSED" && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Paused</h3>
                        <Button onClick={() => setGameState("PLAYING")} className="bg-cyan-600 hover:bg-cyan-700">
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                      </div>
                    )}
                    {gameState === "GAME_OVER" && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Game Over!</h3>
                        <p className="text-gray-300">{playerScore >= WINNING_SCORE ? "You Win!" : "AI Wins!"}</p>
                        <p className="text-gray-300">
                          Final Score: {playerScore} - {aiScore}
                        </p>
                        {playerScore >= WINNING_SCORE && playerScore > highScore && (
                          <p className="text-yellow-400 font-semibold">New High Score!</p>
                        )}
                        <div className="flex gap-2 justify-center">
                          <Button onClick={startNewGame} className="bg-cyan-600 hover:bg-cyan-700">
                            <Play className="w-4 h-4 mr-2" />
                            Play Again
                          </Button>
                          <Button onClick={resetGame} variant="outline">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Menu
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Game Controls */}
            {gameState === "PLAYING" && (
              <div className="flex justify-center gap-2 mt-4">
                <Button onClick={() => setGameState("PAUSED")} variant="outline" size="sm">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
                <Button onClick={resetGame} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions & Stats - same as before but updated instructions */}
        <div className="space-y-6 flex-1 max-w-md">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">↑↓</span>
                </div>
                <span className="text-sm">Use controls or arrow keys to move paddle</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-800 text-xs">●</span>
                </div>
                <span className="text-sm">Hit the ball past your opponent</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{WINNING_SCORE}</span>
                </div>
                <span className="text-sm">First to {WINNING_SCORE} points wins</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">⏸</span>
                </div>
                <span className="text-sm">Tap pause or press SPACE</span>
              </div>
            </CardContent>
          </Card>

          {/* Rest of the side panel remains the same */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Game Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Score:</span>
                <span className="font-semibold">
                  {playerScore} - {aiScore}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">High Score:</span>
                <span className="font-semibold text-yellow-600">{highScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Difficulty:</span>
                <Badge variant="default" className="bg-cyan-600">
                  {difficulty}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                <Badge variant={gameState === "PLAYING" ? "default" : "secondary"}>
                  {gameState.toLowerCase().replace("_", " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Difficulty Levels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Easy</span>
                <span className="text-xs text-gray-500">Slow AI, Slow Ball</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Medium</span>
                <span className="text-xs text-gray-500">Balanced Gameplay</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Hard</span>
                <span className="text-xs text-gray-500">Fast AI, Fast Ball</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileControls
        onDirectionPress={handleDirectionPress}
        onPause={handlePause}
        gameState={gameState}
        showPause={true}
        controlType="vertical"
      />
    </>
  )
}
