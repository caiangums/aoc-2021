import { readFile } from '_utils/file'

const toNumberArray = (arr) => arr.map((v) => parseInt(v))

const findSmallestFuelCost = (posCount) => {
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

const solve = (line) => {
  const crabsPos = toNumberArray(line.split(','))

  const posCount = crabsPos.reduce((acc, crab) => {
    const crabCount = acc.has(crab) ? acc.get(crab) + 1 : 1

    acc.set(crab, crabCount)

    return acc
  }, new Map())

  let result = findSmallestFuelCost(posCount)

  console.log('> result 1:', result)

  // and the second part here
  // console.log('> result 2:')
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
