import { constants } from '../utils'

// Defaults
const {
  BOARD_BORDER, BOARD_BACKGROUND, SNAKE_COL, SNAKE_BORDER, FOOD_BACKGROUND, FOOD_BORDER, BASE_UNIT
} = constants.defaults
// Keys
const { LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY } = constants.keys

// Canvas Draw
const canvasFill = ({
  canvasContext, fillStyle, strokeStyle, width, height, x, y
} : {
  canvasContext: Partial<CanvasRenderingContext2D>, fillStyle: string, strokeStyle: string, width: number, height: number, x: number, y: number
}): void => {
  canvasContext.fillStyle = fillStyle
  canvasContext.strokeStyle = strokeStyle
  canvasContext.fillRect?.(x, y, width, height)
  canvasContext.strokeRect?.(x, y, width, height)
}

const drawSnake = (canvasContext: Partial<CanvasRenderingContext2D>, snake: Array<{ x: number, y: number }>): void => {
  snake.forEach(({ x, y }: { x: number, y: number }) => {
    canvasFill({
      canvasContext, fillStyle: SNAKE_COL, strokeStyle: SNAKE_BORDER, width: BASE_UNIT, height: BASE_UNIT, x, y
    })
  })
}

const clearCanvas = (canvasContext: Partial<CanvasRenderingContext2D>, width: number, height: number): void => {
  canvasFill({
    canvasContext, fillStyle: BOARD_BACKGROUND, strokeStyle: BOARD_BORDER, width, height, x: 0, y: 0
  })
}

const drawFood = (canvasContext: Partial<CanvasRenderingContext2D>, x: number, y: number) => {
  canvasFill({
    canvasContext, fillStyle: FOOD_BACKGROUND, strokeStyle: FOOD_BORDER, width: BASE_UNIT, height: BASE_UNIT, x, y
  })
}

// Ended Game
const hasGameOver = (snake: Array<{ x: number, y: number }>, canvasWidth: number, canvasHeight: number) => {
  for (let index = 4; index < snake.length; index++) {
    if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0
  const hitRightWall = snake[0].x > canvasWidth - 10
  const hitUptWall = snake[0].y < 0
  const hitDownWall = snake[0].y > canvasHeight - 10

  return hitLeftWall || hitRightWall || hitUptWall || hitDownWall
}

export { hasGameOver, drawSnake, clearCanvas, drawFood }
