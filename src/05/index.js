import { readFile } from '_utils/file'

const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), arg)

const toNumberArray = (arr) => arr.map((v) => parseInt(v))

const createPoint = (point) => {
  const [x, y] = toNumberArray(point.split(','))
  return { x, y }
}

const convertToPoints = (lines) =>
  lines.map((line) => {
    const [pointA, pointB] = line.split(/ -> /)

    return [createPoint(pointA), createPoint(pointB)]
  })

const filterStraightLines = (lines) =>
  lines.filter(([a, b]) => a.x === b.x || a.y === b.y)

const Plane = () => {
  const plane = new Map()

  const add = (point) => {
    const count = plane.has(point) ? plane.get(point) : 0
    plane.set(point, count + 1)
  }

  const checkOverlapsHigherThan = (value) => {
    let overlaps = 0

    for (const [point, times] of plane) {
      overlaps = times > value ? overlaps + 1 : overlaps
    }

    return overlaps
  }

  return {
    add,
    checkOverlapsHigherThan,
  }
}

const findOverlaps = (lines) => {
  const plane = Plane()

  lines.some(([a, b]) => {
    if (a.x === b.x) {
      // straight line Y axis
      let [start, end] = a.y >= b.y ? [b.y, a.y] : [a.y, b.y]

      for (let i = start; i <= end; i += 1) {
        plane.add(`${a.x},${i}`)
      }

      return false
    }

    if (a.y === b.y) {
      // straight line X axis
      let [start, end] = a.x >= b.x ? [b.x, a.x] : [a.x, b.x]

      for (let i = start; i <= end; i += 1) {
        plane.add(`${i},${a.y}`)
      }

      return false
    }

    // diagonal lines, always 45 degrees
    // create modifiers
    let xMod = a.x > b.x ? -1 : 1
    let yMod = a.y > b.y ? -1 : 1

    for (
      let i = a.x, j = a.y;
      i !== b.x + xMod && j !== b.y + yMod;
      i += xMod, j += yMod
    ) {
      plane.add(`${i},${j}`)
    }

    return false
  })

  return plane.checkOverlapsHigherThan(1)
}

const solve = (lines) => {
  // just straight lines
  const straightLines = pipe(convertToPoints, filterStraightLines)(lines)

  let result = findOverlaps(straightLines)

  console.log('> result 1:', result)

  const allLines = convertToPoints(lines)

  result = findOverlaps(allLines)

  console.log('> result 2:', result)
}

export default () => {
  console.log('--- Day 05: Hydrothermal Venture ---')

  return readFile('05/input.in')
    .then((data) => {
      const lines = data.split('\n').slice(0, -1)
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
