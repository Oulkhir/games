"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Trophy, Gamepad2 } from "lucide-react"
import MobileControls from "@/components/ui/mobile-controls"

type GameState = "MENU" | "PLAYING" | "PAUSED" | "GAME_OVER"
type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L"

interface Position {
  x: number
  y: number
}

interface Tetromino {
  type: TetrominoType
  shape: number[][]
  position: Position
  color: string
}

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const INITIAL_SPEED = 800

// Tetromino shapes and colors
const TETROMINOES: Record<TetrominoType, { shape: number[][]; color: string }> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "bg-cyan-500",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "bg-yellow-500",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-purple-500",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "bg-green-500",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-red-500",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-blue-500",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-orange-500",
  },
}

export default function TetrisGame() {
  const [board, setBoard] = useState<string[][]>(() =>
    Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill("")),
  )
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null)
  const [nextPiece, setNextPiece] = useState<Tetromino | null>(null)
  const [gameState, setGameState] = useState<GameState>("MENU")
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(1)
  const [highScore, setHighScore] = useState(0)
  const [dropTime, setDropTime] = useState(INITIAL_SPEED)
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const lastDropTime = useRef<number>(0)

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("tetris-high-score")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Generate random tetromino
  const generateTetromino = useCallback((): Tetromino => {
    const types: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"]
    const type = types[Math.floor(Math.random() * types.length)]
    const template = TETROMINOES[type]

    return {
      type,
      shape: template.shape,
      position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(template.shape[0].length / 2), y: 0 },
      color: template.color,
    }
  }, [])

  // Check if position is valid
  const isValidPosition = useCallback(
    (piece: Tetromino, newBoard?: string[][]): boolean => {
      const boardToCheck = newBoard || board

      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const newX = piece.position.x + x
            const newY = piece.position.y + y

            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || (newY >= 0 && boardToCheck[newY][newX])) {
              return false
            }
          }
        }
      }
      return true
    },
    [board],
  )

  // Rotate piece
  const rotatePiece = useCallback((piece: Tetromino): Tetromino => {
    const rotated = piece.shape[0].map((_, index) => piece.shape.map((row) => row[index]).reverse())

    return {
      ...piece,
      shape: rotated,
    }
  }, [])

  // Place piece on board
  const placePiece = useCallback((piece: Tetromino, targetBoard: string[][]): string[][] => {
    const newBoard = targetBoard.map((row) => [...row])

    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.position.y + y
          const boardX = piece.position.x + x
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.color
          }
        }
      }
    }

    return newBoard
  }, [])

  // Clear completed lines
  const clearLines = useCallback((targetBoard: string[][]): { newBoard: string[][]; linesCleared: number } => {
    const newBoard = targetBoard.filter((row) => row.some((cell) => !cell))
    const linesCleared = BOARD_HEIGHT - newBoard.length

    // Add empty rows at the top
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(""))
    }

    return { newBoard, linesCleared }
  }, [])

  // Move piece
  const movePiece = useCallback(
    (dx: number, dy: number): boolean => {
      if (!currentPiece) return false

      const newPiece = {
        ...currentPiece,
        position: { x: currentPiece.position.x + dx, y: currentPiece.position.y + dy },
      }

      if (isValidPosition(newPiece)) {
        setCurrentPiece(newPiece)
        return true
      }
      return false
    },
    [currentPiece, isValidPosition],
  )

  // Drop piece
  const dropPiece = useCallback(() => {
    if (!currentPiece) return

    if (!movePiece(0, 1)) {
      // Piece can't move down, place it
      const newBoard = placePiece(currentPiece, board)
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard)

      setBoard(clearedBoard)
      setLines((prev) => {
        const newLines = prev + linesCleared
        const newLevel = Math.floor(newLines / 10) + 1
        setLevel(newLevel)
        setDropTime(Math.max(50, INITIAL_SPEED - (newLevel - 1) * 50))
        return newLines
      })

      // Calculate score
      const points =
        linesCleared === 1 ? 100 : linesCleared === 2 ? 300 : linesCleared === 3 ? 500 : linesCleared === 4 ? 800 : 0
      setScore((prev) => {
        const newScore = prev + points * level
        if (newScore > highScore) {
          setHighScore(newScore)
          localStorage.setItem("tetris-high-score", newScore.toString())
        }
        return newScore
      })

      // Spawn next piece
      if (nextPiece && isValidPosition(nextPiece, clearedBoard)) {
        setCurrentPiece(nextPiece)
        setNextPiece(generateTetromino())
      } else {
        setGameState("GAME_OVER")
      }
    }
  }, [
    currentPiece,
    board,
    movePiece,
    placePiece,
    clearLines,
    level,
    highScore,
    nextPiece,
    isValidPosition,
    generateTetromino,
  ])

  // Game loop
  useEffect(() => {
    if (gameState === "PLAYING") {
      const gameLoop = () => {
        const now = Date.now()
        if (now - lastDropTime.current > dropTime) {
          dropPiece()
          lastDropTime.current = now
        }
        gameLoopRef.current = setTimeout(gameLoop, 16)
      }
      gameLoop()
    } else {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current)
      }
    }
  }, [gameState, dropTime, dropPiece])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== "PLAYING" || !currentPiece) return

      switch (e.key.toLowerCase()) {
        case "arrowleft":
        case "a":
          movePiece(-1, 0)
          break
        case "arrowright":
        case "d":
          movePiece(1, 0)
          break
        case "arrowdown":
        case "s":
          dropPiece()
          break
        case "arrowup":
        case "w":
        case " ":
          e.preventDefault()
          const rotated = rotatePiece(currentPiece)
          if (isValidPosition(rotated)) {
            setCurrentPiece(rotated)
          }
          break
        case "p":
          setGameState((prev) => (prev === "PLAYING" ? "PAUSED" : "PLAYING"))
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState, currentPiece, movePiece, dropPiece, rotatePiece, isValidPosition])

  const handleDirectionPress = useCallback(
    (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
      if (gameState !== "PLAYING" || !currentPiece) return

      switch (direction) {
        case "LEFT":
          movePiece(-1, 0)
          break
        case "RIGHT":
          movePiece(1, 0)
          break
        case "DOWN":
          dropPiece()
          break
        case "UP":
          // Rotate piece
          const rotated = rotatePiece(currentPiece)
          if (isValidPosition(rotated)) {
            setCurrentPiece(rotated)
          }
          break
      }
    },
    [gameState, currentPiece, movePiece, dropPiece, rotatePiece, isValidPosition],
  )

  const handleRotate = useCallback(() => {
    if (gameState !== "PLAYING" || !currentPiece) return

    const rotated = rotatePiece(currentPiece)
    if (isValidPosition(rotated)) {
      setCurrentPiece(rotated)
    }
  }, [gameState, currentPiece, rotatePiece, isValidPosition])

  const handlePause = useCallback(() => {
    if (gameState === "PLAYING") {
      setGameState("PAUSED")
    } else if (gameState === "PAUSED") {
      setGameState("PLAYING")
    }
  }, [gameState])

  // Start new game
  const startNewGame = () => {
    setBoard(
      Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill("")),
    )
    setScore(0)
    setLines(0)
    setLevel(1)
    setDropTime(INITIAL_SPEED)
    const firstPiece = generateTetromino()
    const secondPiece = generateTetromino()
    setCurrentPiece(firstPiece)
    setNextPiece(secondPiece)
    setGameState("PLAYING")
    lastDropTime.current = Date.now()
  }

  // Reset game
  const resetGame = () => {
    setBoard(
      Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill("")),
    )
    setCurrentPiece(null)
    setNextPiece(null)
    setScore(0)
    setLines(0)
    setLevel(1)
    setDropTime(INITIAL_SPEED)
    setGameState("MENU")
  }

  // Render board with current piece
  const renderBoard = () => {
    let displayBoard = board.map((row) => [...row])

    if (currentPiece) {
      displayBoard = placePiece(currentPiece, displayBoard)
    }

    return displayBoard
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Game Board */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-purple-600" />
              Block Puzzle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Game Grid */}
              <div
                className="grid bg-gray-900 border-2 border-gray-600 rounded-lg overflow-hidden mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
                  width: "min(300px, 80vw)",
                  height: "min(600px, 160vw)",
                }}
              >
                {renderBoard().map((row, y) =>
                  row.map((cell, x) => (
                    <div key={`${y}-${x}`} className={`border border-gray-700 ${cell || "bg-gray-800"}`} />
                  )),
                )}
              </div>

              {/* Game State Overlay */}
              {gameState !== "PLAYING" && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white">
                    {gameState === "MENU" && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Block Puzzle</h3>
                        <p className="text-gray-300">Arrange blocks to clear lines</p>
                        <Button onClick={startNewGame} className="bg-purple-600 hover:bg-purple-700">
                          <Play className="w-4 h-4 mr-2" />
                          Start Game
                        </Button>
                      </div>
                    )}
                    {gameState === "PAUSED" && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Paused</h3>
                        <Button onClick={() => setGameState("PLAYING")} className="bg-purple-600 hover:bg-purple-700">
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
                          <Button onClick={startNewGame} className="bg-purple-600 hover:bg-purple-700">
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

        {/* Side Panel */}
        <div className="space-y-6 flex-1 max-w-md">
          {/* Next Piece */}
          {nextPiece && gameState === "PLAYING" && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Next Piece</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="grid bg-gray-900 border border-gray-600 rounded p-2 mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(4, 1fr)`,
                    width: "80px",
                    height: "80px",
                  }}
                >
                  {Array.from({ length: 16 }).map((_, index) => {
                    const x = index % 4
                    const y = Math.floor(index / 4)
                    const isBlock = nextPiece.shape[y]?.[x]

                    return (
                      <div
                        key={index}
                        className={`border border-gray-700 ${isBlock ? nextPiece.color : "bg-gray-800"}`}
                      />
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Game Stats */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Game Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Score:</span>
                <span className="font-semibold">{score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">High Score:</span>
                <span className="font-semibold text-yellow-600">{highScore.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Lines:</span>
                <span className="font-semibold">{lines}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Level:</span>
                <Badge variant="default" className="bg-purple-600">
                  {level}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">←→</span>
                </div>
                <span className="text-sm">Move left/right</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">↓</span>
                </div>
                <span className="text-sm">Drop faster</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">↻</span>
                </div>
                <span className="text-sm">Rotate piece</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">⏸</span>
                </div>
                <span className="text-sm">Pause game</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileControls
        onDirectionPress={handleDirectionPress}
        onRotate={handleRotate}
        onPause={handlePause}
        gameState={gameState}
        showRotate={true}
        showPause={true}
        controlType="dpad"
      />
    </>
  )
}
