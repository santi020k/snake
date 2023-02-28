const roundNearest = (num: number, base: number): number => {
  return Math.round(num / base) * base
}

const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomFood = (min: number, max: number, base: number): number => {
  return Math.round((Math.random() * (max - min) + min) / base) * base
}

export { roundNearest, randomIntFromInterval, randomFood }
