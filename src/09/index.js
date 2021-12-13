import { readFile } from '_utils/file'

const toNumberArray = (a) => a.map((v) => parseInt(v))

const sum = (a) => a.reduce((sum, v) => v + sum, 0)
const multiplyArray = (a) => a.reduce((mult, v) => v * mult, 1)

const MAX_VAL = 9

const buildGetAdjacents = (heightmap, separator = MAX_VAL) => {
  const xMax = heightmap[0].length - 1
  const yMax = heightmap.length - 1

  return (x, y) => [
    y > 0 ? heightmap[y - 1][x] : separator, // top
    x < xMax ? heightmap[y][x + 1] : separator, // right
    y < yMax ? heightmap[y + 1][x] : separator, // bottom
    x > 0 ? heightmap[y][x - 1] : separator, // left
  ]
}

const isLowerThanAdjacents = (value, adjacents) =>
  !adjacents.some((a) => value >= a)

const partOne = (heightmap) => {
  const getAdjascents = buildGetAdjacents(heightmap)

  const lowpoints = []

  heightmap.forEach((line, j) =>
    line.forEach((v, i) => {
      const adjacents = getAdjascents(i, j)

      if (isLowerThanAdjacents(v, adjacents)) {
        lowpoints.push(v + 1)
      }
    })
  )

  return sum(lowpoints)
}

const DOT = '.'

const partTwo = (heightmap) => {
  const boundedHeightmap = heightmap.map((line) =>
    line.map((v) => (v === MAX_VAL ? DOT : v))
  )

  const getAdjascents = buildGetAdjacents(heightmap, DOT)

  const searchDepth = (i, j) => {
    let count = 0

    if (boundedHeightmap[j][i] !== DOT) {
      count += 1
      boundedHeightmap[j][i] = DOT
      const [top, right, bottom, left] = getAdjascents(i, j)
      if (top !== DOT) {
        count += searchDepth(i, j - 1)
      }
      if (right !== DOT) {
        count += searchDepth(i + 1, j)
      }
      if (bottom !== DOT) {
        count += searchDepth(i, j + 1)
      }
      if (left !== DOT) {
        count += searchDepth(i - 1, j)
      }
    }

    return count
  }

  const sizes = []

  heightmap.forEach((_line, j) => {
    _line.forEach((_value, i) => {
      const count = searchDepth(i, j)
      if (count > 0) {
        sizes.push(count)
      }
    })
  })

  return multiplyArray(sizes.sort((a, b) => b - a).slice(0, 3))
}

const solve = (lines) => {
  const heightmap = lines.map((line) => toNumberArray(line.split('')))

  let result = partOne(heightmap)

  console.log('> result 1:', result)

  result = partTwo(heightmap)

  console.log('> result 2:', result)
}

export default () => {
  console.log('--- Day 09: Smoke Basin ---')

  return readFile('09/input.in')
    .then((data) => {
      const lines = data.split('\n').slice(0, -1)
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
