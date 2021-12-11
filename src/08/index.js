import { readFile } from '_utils/file'

const DIGIT_LIGHTS = {
  2: 0, // one
  4: 1, // four
  3: 2, // seven
  7: 3, // eight
}

const UNIQUE_DIGITS = Object.keys(DIGIT_LIGHTS)

const digitOccurrences = [0, 0, 0, 0]

const solve = (lines) => {
  const outputValues = lines.map((line) => line.split(" | ")[1].split(" "))

  const occurrences = [...digitOccurrences]

  outputValues.forEach((line) => 
    line.forEach((value) => {
      if (UNIQUE_DIGITS.includes(value.length)) {
        const index = DIGIT_LIGHTS[value.length]
        occurrences[index] += 1
      }
    })
  )

  let result = occurrences.reduce((sum, occ) => occ + sum, 0)

  console.log('> result 1:', result)

  // and the second part here
  // console.log('> result 2:')
}

export default () => {
  console.log('--- Day 08: Seven Segment Search ---')

  return readFile('08/input.in')
    .then((data) => {
      const lines = data.split('\n').slice(0, -1)
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
