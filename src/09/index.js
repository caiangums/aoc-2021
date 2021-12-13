import { readFile } from '_utils/file'

const toNumberArray = (a) => a.map((v) => parseInt(v))

const sum = (a) => a.reduce((sum, v) => v + sum, 0)

const MAX_VAL = 9

const buildGetAdjacents = (heightmap) => {
  const xMax = heightmap[0].length - 1
  const yMax = heightmap.length - 1

  return (x, y) => [
    y > 0 ? heightmap[y - 1][x] : MAX_VAL, // top
    x < xMax ? heightmap[y][x + 1] : MAX_VAL, // right
    y < yMax ? heightmap[y + 1][x] : MAX_VAL, // bottom
    x > 0 ? heightmap[y][x - 1] : MAX_VAL, // left
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

const solve = (lines) => {
  const heightmap = lines.map((line) => toNumberArray(line.split('')))

  const result = partOne(heightmap)

  console.log('> result 1:', result)

  // and the second part here
  // console.log('> result 2:')
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
