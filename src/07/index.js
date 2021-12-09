import { readFile } from '_utils/file'

const toNumberArray = (arr) => arr.map((v) => parseInt(v))

// the "best spot" is where more crabs are
const findSmallestFuelCostPartOne = (crabsPos) => {
  const posCount = crabsPos.reduce((acc, crab) => {
    const crabCount = acc.has(crab) ? acc.get(crab) + 1 : 1

    acc.set(crab, crabCount)

    return acc
  }, new Map())

  let finalResult = Number.MAX_SAFE_INTEGER

  for (let [actualCrab] of posCount) {
    let result = 0

    for (let [crab, occ] of posCount) {
      if (crab !== actualCrab) {
        result += Math.abs(crab - actualCrab) * occ
      }
    }

    finalResult = result < finalResult ? result : finalResult
  }

  return finalResult
}

const getFuelCost = ({ crabs, location }) =>
  crabs.reduce((cost, crab) => {
    const simpleCost = Math.abs(crab - location)
    const crabCost = (simpleCost * (simpleCost + 1)) / 2

    return cost + crabCost
  }, 0)

// brute force
const findSmallestFuelCostPartTwo = (crabs) => {
  const ordered = [...crabs].sort((a, b) => a - b)

  const [min, max] = [ordered[0], ordered[ordered.length - 1]]
  let target = min
  let fuel = Number.MAX_SAFE_INTEGER

  for (let i = min; i <= max; i += 1) {
    let actualFuel = getFuelCost({ crabs: ordered, location: i })
    if (actualFuel < fuel) {
      fuel = actualFuel
      target = i
    }
  }

  return fuel
}

const solve = (line) => {
  const crabsPos = toNumberArray(line.split(','))

  let result = findSmallestFuelCostPartOne(crabsPos)

  console.log('> result 1:', result)

  result = findSmallestFuelCostPartTwo(crabsPos)

  console.log('> result 2:', result)
}

export default () => {
  console.log('--- Day 07: The Treachery of Whales ---')

  return readFile('07/input.in')
    .then((data) => {
      const [line] = data.split('\n')
      solve(line)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
