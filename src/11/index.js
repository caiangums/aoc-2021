import { readFile } from '_utils/file'

const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), arg)

const increaseEnergyLevel = (octopuses) =>
  octopuses.map((octopusesLine) => octopusesLine.map((octopus) => octopus + 1))

const MAX_SIZE = 10

// get near places and filter just valid ones
const getSpreading = (i, j) =>
  [
    [i - 1, j - 1],
    [i, j - 1],
    [i + 1, j - 1],
    [i - 1, j],
    [i + 1, j],
    [i - 1, j + 1],
    [i, j + 1],
    [i + 1, j + 1],
  ].filter(([x, y]) => x >= 0 && x < MAX_SIZE && y >= 0 && y < MAX_SIZE)

const spreadFlash = ({ stepOctopuses, i, j }) => {
  let updated = [...stepOctopuses]

  const spreading = getSpreading(i, j)

  spreading.forEach(([x, y]) => {
    if (updated[x][y] < MAX_SIZE) {
      // update energy level
      updated[x][y] += 1

      // if needs to flash but not flashed yet
      if (updated[x][y] === MAX_SIZE) {
        // energy level++ = 11 = flashed this round
        updated[x][y] += 1
        updated = spreadFlash({ stepOctopuses: [...updated], i: x, j: y })
      }
    }
  })

  return updated
}

const propagateFlashes = (octopuses) => {
  let stepOctopuses = [...octopuses]

  octopuses.forEach((octopusesLine, i) =>
    octopusesLine.forEach((_octopus, j) => {
      if (stepOctopuses[i][j] === 10) {
        stepOctopuses = spreadFlash({ stepOctopuses, i, j })
      }
    })
  )

  return {
    stepFlashes: stepOctopuses.reduce(
      (flashes, oLine) =>
        oLine.reduce((fl, o) => (o >= 10 ? fl + 1 : fl), 0) + flashes,
      0
    ),
    stepOctopuses: stepOctopuses.map((oLine) =>
      oLine.map((v) => (v >= 10 ? 0 : v))
    ),
  }
}

const checkForAllFlashes = (octopuses) =>
  octopuses.reduce((acc, oLine) => !oLine.some((o) => o !== 0) && acc, true)

const PART_ONE_MAX_STEPS = 100

const solve = (lines) => {
  let step = 0
  let flashes = 0
  let octopuses = lines

  while (step < PART_ONE_MAX_STEPS) {
    let { stepOctopuses, stepFlashes } = pipe(
      increaseEnergyLevel,
      propagateFlashes
    )(octopuses)

    octopuses = stepOctopuses
    flashes += stepFlashes
    step += 1
  }

  console.log('> result 1:', flashes)

  step = 0
  octopuses = lines
  let allFlashed = false

  while (!allFlashed) {
    let { stepOctopuses, stepFlashes } = pipe(
      increaseEnergyLevel,
      propagateFlashes
    )(octopuses)

    octopuses = stepOctopuses
    allFlashed = checkForAllFlashes(octopuses)
    step += 1
  }

  console.log('> result 2:', step)
}

export default () => {
  console.log('--- Day 11: Dumbo Octopus ---')

  return readFile('11/input.in')
    .then((data) => {
      const lines = data
        .split('\n')
        .slice(0, -1)
        .map((line) => line.split('').map((v) => parseInt(v)))
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
