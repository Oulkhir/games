"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Trophy, Gamepad2 } from "lucide-react"
import MobileControls from "@/components/ui/mobile-controls"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }
type GameState = "MENU" | "PLAYING" | "PAUSED" | "GAME_OVER"

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION: Direction = "RIGHT"
const GAME_SPEED = 150

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [gameState, setGameState] = useState<GameState>("MENU")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const gameLoopRef = useRef<NodeJS.Timeout>()

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("snake-high-score")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Self collision
    return body.some((segment) => segment.x === head.x && segment.y === head.y)
  }, [])

  // Move snake
  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (direction) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check collision
      if (checkCollision(head, newSnake)) {
        setGameState("GAME_OVER")
        return currentSnake
      }

      newSnake.unshift(head)

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10
          if (newScore > highScore) {
            setHighScore(newScore)
            localStorage.setItem("snake-high-score", newScore.toString())
          }
          return newScore
        })
        setFood(generateFood(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, checkCollision, generateFood, highScore])

  // Game loop
  useEffect(() => {
    if (gameState === "PLAYING") {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState, moveSnake])

  // Handle keyboard input
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (gameState !== "PLAYING") return

      const key = e.key.toLowerCase()
      switch (key) {
        case "arrowup":
        case "w":
          handleDirectionChange("UP")
          break
        case "arrowdown":
        case "s":
          handleDirectionChange("DOWN")
          break
        case "arrowleft":
        case "a":
          handleDirectionChange("LEFT")
          break
        case "arrowright":
        case "d":
          handleDirectionChange("RIGHT")
          break
        case " ":
          e.preventDefault()
          handlePause()
          break
      }
    },
    [gameState],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  // Start new game
  const startNewGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(generateFood(INITIAL_SNAKE))
    setScore(0)
    setGameState("PLAYING")
  }

  // Reset game
  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood({ x: 15, y: 15 })
    setScore(0)
    setGameState("MENU")
  }

  const handleDirectionChange = useCallback(
    (newDirection: Direction) => {
      if (gameState !== "PLAYING") return

      // Prevent reverse direction
      const opposites = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      }

      if (direction !== opposites[newDirection]) {
        setDirection(newDirection)
      }
    },
    [direction, gameState],
  )

  const handlePause = useCallback(() => {
    if (gameState === "PLAYING") {
      setGameState("PAUSED")
    } else if (gameState === "PAUSED") {
      setGameState("PLAYING")
    }
  }, [gameState])

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Game Board */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-green-600" />
                Snake Classic
              </CardTitle>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  Score: {score}
                </Badge>
                {highScore > 0 && (
                  <Badge variant="outline" className="text-sm flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    Best: {highScore}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Game Grid */}
              <div
                className="grid bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                  width: "min(400px, 90vw)",
                  height: "min(400px, 90vw)",
                }}
              >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                  const x = index % GRID_SIZE
                  const y = Math.floor(index / GRID_SIZE)

                  const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y
                  const isSnakeBody = snake.slice(1).some((segment) => segment.x === x && segment.y === y)
                  const isFood = food.x === x && food.y === y

                  return (
                    <div
                      key={index}
                      className={`
                        border border-gray-200 dark:border-gray-600 transition-colors duration-75
                        ${isSnakeHead ? "bg-green-600" : ""}
                        ${isSnakeBody ? "bg-green-400" : ""}
                        ${isFood ? "bg-red-500 rounded-full" : ""}
                      `}
                    />
                  )
                })}
              </div>

              {/* Game State Overlay */}
              {gameState !== "PLAYING" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white">
                    {gameState === "MENU" && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Snake Classic</h3>
                        <p className="text-gray-300">Use controls to move the snake</p>
                        <Button onClick={startNewGame} className="bg-green-600 hover:bg-green-700">
                          <Play className="w-4 h-4 mr-2" />
                          Start Game
                        </Button>
                      </div>
                    )}
                    {gameState === "PAUSED" && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Paused</h3>
                        <Button onClick={() => setGameState("PLAYING")} className="bg-green-600 hover:bg-green-700">
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                      </div>
                    )}
                    {gameState === "GAME_OVER" && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Game Over!</h3>
                        <p className="text-gray-300">Final Score: {score}</p>
                        {score === highScore && score > 0 && (
                          <p className="text-yellow-400 font-semibold">New High Score!</p>
                        )}
                        <div className="flex gap-2 justify-center">
                          <Button onClick={startNewGame} className="bg-green-600 hover:bg-green-700">
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

        {/* Instructions & Info */}
        <div className="space-y-6 flex-1 max-w-md">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">↑</span>
                </div>
                <span className="text-sm">Use controls or arrow keys to move</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">●</span>
                </div>
                <span className="text-sm">Eat red food to grow and score points</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs">⚠</span>
                </div>
                <span className="text-sm">Avoid walls and your own tail</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">⏸</span>
                </div>
                <span className="text-sm">Tap pause button or press SPACE</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Game Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Score:</span>
                <span className="font-semibold">{score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">High Score:</span>
                <span className="font-semibold text-yellow-600">{highScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Snake Length:</span>
                <span className="font-semibold">{snake.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                <Badge variant={gameState === "PLAYING" ? "default" : "secondary"}>
                  {gameState.toLowerCase().replace("_", " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileControls
        onDirectionPress={handleDirectionChange}
        onPause={handlePause}
        gameState={gameState}
        showPause={true}
        controlType="dpad"
      />
    </>
  )
}
