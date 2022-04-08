import { readFile } from '_utils/file'

const PART_ONE = 10

const PART_TWO = 40

// brute-force, generating strings
const findDifferenceAfterSomeSteps = (start, convert, steps) => {
  let step = 0
  let actual = start

  while (step < steps) {
    let newPolymer = ''

    for (let i = 0; i < actual.length - 1; i += 1) {
      newPolymer += `${actual.charAt(i)}${convert.get(actual.slice(i, i + 2))}`
    }

    newPolymer += actual.charAt(actual.length - 1)

    actual = newPolymer
    step += 1
  }

  const occurrences = actual.split('').reduce((acc, letter) => {
    acc.set(letter, acc.has(letter) ? acc.get(letter) + 1 : 1)

    return acc
  }, new Map())

  const occurrencesArray = Array.from(occurrences).sort((a, b) => a[1] - b[1])

  return (
    occurrencesArray[occurrencesArray.length - 1][1] - occurrencesArray[0][1]
  )
}

const countPairs = (start, convert, steps) => {
  let step = 0
  let actual = new Map()
  const occurrences = new Map()

  // start filling actual state
  for (let i = 0; i < start.length - 1; i += 1) {
    const pair = `${start.charAt(i)}${start.charAt(i + 1)}`

    actual.set(pair, actual.has(pair) ? actual.get(pair) + 1 : 1)
  }

  // NOTE: this is needed because one last letter occurrence will be "lost"
  occurrences.set(start.charAt(start.length - 1), 1)

  while (step < steps) {
    let np = new Map()

    for (const [polymer, times] of actual) {
      const [l, m] = polymer.split('')
      const fstPair = `${l}${convert.get(polymer)}`
      const sndPair = `${convert.get(polymer)}${m}`

      np.set(fstPair, np.has(fstPair) ? np.get(fstPair) + times : times)
      np.set(sndPair, np.has(sndPair) ? np.get(sndPair) + times : times)
    }

    actual = np

    step += 1
  }

  for (const [polymer, times] of actual) {
    const [l, m] = polymer.split('')
    occurrences.set(l, occurrences.has(l) ? occurrences.get(l) + times : times)
  }

  const occurrencesArray = Array.from(occurrences).sort((a, b) => a[1] - b[1])

  return (
    occurrencesArray[occurrencesArray.length - 1][1] - occurrencesArray[0][1]
  )
}

const solve = (lines) => {
  const [start, _empty, ...conversion] = lines.slice(0, -1)

  const convert = conversion.reduce((acc, conv) => {
    const [_match, source, insert] = conv.match(/(\w{2}) -> (\w)/i)

    acc.set(source, insert)

    return acc
  }, new Map())

  let result = findDifferenceAfterSomeSteps(start, convert, PART_ONE)
  const pairsCounted = countPairs(start, convert, PART_ONE)

  console.log('> result 1:', result, '(with counting pairs =', pairsCounted, ')')

  result = countPairs(start, convert, PART_TWO)

  console.log('> result 2:', result)
}

export default () => {
  console.log('--- Day 14: Extended Polymerization ---')

  return readFile('14/input.in')
    .then((data) => {
      const lines = data.split('\n')
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
