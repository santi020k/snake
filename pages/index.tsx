/* eslint-disable react-hooks/exhaustive-deps */
// Libs:
import Head from 'next/head'
import { useRef, useEffect, useState } from 'react'
// Snake Game:
import { hasGameOver, clearCanvas, drawFood, drawSnake } from '../snake-game'
// Utils:
import { roundNearest, randomIntFromInterval, useKeyDown, constants, randomFood } from '../utils'
// Styles:
import styles from '../styles/Home.module.css'

// Defaults
const {
  BOARD_BORDER, BOARD_BACKGROUND, SNAKE_COL, SNAKE_BORDER, FOOD_BACKGROUND, FOOD_BORDER, BASE_UNIT
} = constants.defaults
// Keys
const { LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY } = constants.keys

export default function Home() {
  // states
  const [isGameOver, setIsGameOver] = useState(false)
  const [isHighScore, setIsHighScore] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  // References
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const canvasContext = useRef<Partial<CanvasRenderingContext2D>>({})

  // Positions
  let canvasHeight = canvasElement?.current?.height ?? 0
  let canvasWidth = canvasElement?.current?.width ?? 0
  let centerHeight = roundNearest(canvasHeight / 2, BASE_UNIT)
  let centerWidth = roundNearest(canvasWidth / 2, BASE_UNIT)
  let initialSnake = [{ x: centerWidth, y: centerHeight }, { x: centerWidth - BASE_UNIT, y: centerHeight }, { x: centerWidth - (BASE_UNIT * 2), y: centerHeight }, { x: centerWidth - (BASE_UNIT * 3), y: centerHeight }]

  // Directions
  const changingDirection = useRef<boolean>(false)
  // Horizontal velocity
  const dx = useRef(BASE_UNIT)
  // Vertical Velocity
  const dy = useRef(0)

  // Food and Score
  let foodX = 0
  let foodY = 0
  let foodTiming = 0
  let foodTimeOut = randomIntFromInterval(4, 10) * 10

  // Initial snake
  let snake = [...initialSnake]

  // Motion
  const moveSnake = () => {
    const head = { x: snake[0].x + dx.current, y: snake[0].y + dy.current }
    snake.unshift(head)
    const hasEaten = snake[0].x === foodX && snake[0].y === foodY
    if (hasEaten) {
      setCurrentScore(previousScore => {
        const newScore = previousScore + BASE_UNIT
        if (newScore > maxScore) setIsHighScore(true)
        setMaxScore(newScore > maxScore ? newScore : maxScore)
        return newScore
      })
      genFood()
    } else {
      snake.pop()
    }
  }

  const genFood = () => {
    foodX = randomFood(0, canvasWidth, BASE_UNIT)
    foodY = randomFood(0, canvasHeight, BASE_UNIT)
    foodTiming = 0
    snake.forEach((part) => {
      const hasEaten = part.x === foodX && part.y === foodY
      if (hasEaten) genFood()
    })
  }

  const changeDirection = (event: KeyboardEvent) => {
    if (changingDirection.current) return
    changingDirection.current = true

    const keyPressed = event.key
    const goingUp = dy.current === -BASE_UNIT
    const goingDown = dy.current === BASE_UNIT
    const goingRight = dx.current === BASE_UNIT
    const goingLeft = dx.current === -BASE_UNIT

    if (keyPressed === LEFT_KEY && !goingRight) {
      dx.current = -10
      dy.current = 0
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx.current = 10
      dy.current = 0
    }

    if (keyPressed === UP_KEY && !goingDown) {
      dx.current = 0
      dy.current = -10
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
      dx.current = 0
      dy.current = 10
    }
  }

  // Main Process
  const main = () => {
    if (hasGameOver(snake, canvasWidth, canvasHeight)) {
      setIsGameOver(true)
      return
    };

    changingDirection.current = false

    if (foodTiming === foodTimeOut) {
      console.log({ foodTiming })
      genFood()
      foodTiming = 0
      foodTimeOut = randomIntFromInterval(4, 10) * 10
    } else {
      ++foodTiming
    }

    setTimeout(() => {
      clearCanvas(canvasContext.current, canvasWidth, canvasHeight)
      drawFood(canvasContext.current, foodX, foodY)
      moveSnake()
      drawSnake(canvasContext.current, snake)
      main()
    }, 100)
  }

  // Restart
  const restartGame = () => {
    snake = [...initialSnake]
    dx.current = BASE_UNIT
    dy.current = 0
    genFood()
    setIsGameOver(false)
    setIsHighScore(false)
    setCurrentScore(0)

    setTimeout(() => {
      clearCanvas(canvasContext.current, canvasWidth, canvasHeight)
      drawFood(canvasContext.current, foodX, foodY)
      moveSnake()
      drawSnake(canvasContext.current, snake)
      main()
    }, 100)
  }

  // Hooks
  useKeyDown(changeDirection)

  useEffect(() => {
    // Get 2D context
    canvasContext.current  = canvasElement?.current?.getContext("2d") ?? {}

    // Positions
    canvasHeight = canvasElement?.current?.height ?? 0
    canvasWidth = canvasElement?.current?.width ?? 0
    centerHeight = roundNearest(canvasHeight / 2, BASE_UNIT)
    centerWidth = roundNearest(canvasWidth / 2, BASE_UNIT)

    // Re-center the snake when window loads
    if (typeof window !== 'undefined') {
      initialSnake = [{ x: centerWidth, y: centerHeight }, { x: centerWidth - BASE_UNIT, y: centerHeight }, { x: centerWidth - (BASE_UNIT * 2), y: centerHeight }, { x: centerWidth - (BASE_UNIT * 3), y: centerHeight }]
      snake = [...initialSnake]
    }

    // Gen Food
    genFood()
    // Main Processor
    main()
  }, [])

  return (
    <>
      <Head>
        <title>Snake Game</title>
        <meta name="description" content="Snake Game by Santi020k" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={ styles.main }>
        <div className={ `${styles["game-over"]} ${isGameOver ? 'display-flex' : 'display-none'}` }>
          <h1>Game Over</h1>
          <button onClick={ restartGame }>Play again</button>
        </div>
        <div className={ `${isHighScore ? styles['high-score'] : ''} ${isGameOver ? 'color-white' : ''} ${styles.score}` }>Score: <span>{ currentScore }</span></div>
        <canvas className={ styles.canvas }  ref={ canvasElement } />
      </main>
    </>
  )
}
