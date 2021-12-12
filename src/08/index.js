import { readFile } from '_utils/file'

const DIGIT_LIGHTS = {
  2: 0, // one
  4: 1, // four
  3: 2, // seven
  7: 3, // eight
}

const UNIQUE_DIGITS = Object.keys(DIGIT_LIGHTS).map((v) => parseInt(v))

const digitOccurrences = [0, 0, 0, 0]

const partOne = (outputValues) => {
  const occurrences = [...digitOccurrences]

  outputValues.forEach((line) =>
    line.forEach((value) => {
      if (UNIQUE_DIGITS.includes(value.length)) {
        const index = DIGIT_LIGHTS[value.length]
        occurrences[index] += 1
      }
    })
  )

  return occurrences.reduce((sum, occ) => occ + sum, 0)
}

const KNOWN_DIGITS = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
}

const partTwo = (allValues) => {
  let result = 0

  allValues.forEach((line) => {
    let [unique, output] = line.map((str) => str.split(' '))

    const known = new Map()
    const unknown = new Map()

    unique.forEach((value) => {
      const sorted = [...value].sort().join('')
      if (UNIQUE_DIGITS.includes(sorted.length)) {
        known.set(sorted, KNOWN_DIGITS[sorted.length])
      } else {
        unknown.set(sorted, -1)
      }
    })

    let [zero, one, two, three, four, five, six, seven, eight, nine] =
      new Array(10).fill('')

    for (let [key, value] of known) {
      if (value === 1) {
        one = key
      }
      if (value === 4) {
        four = key
      }
      if (value === 7) {
        seven = key
      }
      if (value === 8) {
        eight = key
      }
    }

    const zeroAndSix = []
    const twoAndFive = []
    const checkOne = [...one]
    for (let [key, _value] of unknown) {
      // find nine
      if (key.length === 6) {
        const check = [...new Set([...four, ...seven])]
        const leftOver = [...key].filter((char) => !check.includes(char))
        if (leftOver.length === 1) {
          nine = key
          known.set(nine, 9)
        } else {
          zeroAndSix.push(key)
        }
      }

      // find three
      if (key.length === 5) {
        const leftOver = [...key].filter((char) => !checkOne.includes(char))
        if (leftOver.length === 3) {
          three = key
          known.set(three, 3)
        } else {
          twoAndFive.push(key)
        }
      }
    }
    unknown.delete(nine)
    unknown.delete(three)

    // find zero and six
    zeroAndSix.forEach((key) => {
      const leftOver = [...key].filter((char) => !checkOne.includes(char))
      if (leftOver.length === 4) {
        zero = key
        known.set(zero, 0)
        unknown.delete(zero)
      } else {
        six = key
        known.set(six, 6)
        unknown.delete(six)
      }
    })

    // find two and five
    const checkNine = [...nine]
    twoAndFive.forEach((key) => {
      const leftOver = [...key].filter((char) => !checkNine.includes(char))
      if (leftOver.length === 0) {
        five = key
        known.set(five, 5)
        unknown.delete(five)
      } else {
        two = key
        known.set(two, 2)
        unknown.delete(two)
      }
    })

    const outputNumber = output.reduce((acc, line) => {
      const value = line
        .split(' ')
        .map((v) => {
          const sorted = [...v].sort().join('')
          return known.get(sorted)
        })
        .join('')

      return acc + value
    }, "")

    result += parseInt(outputNumber)
  })

  return result
}

const solve = (lines) => {
  const outputValues = lines.map((line) => line.split(' | ')[1].split(' '))

  let result = partOne(outputValues)

  console.log('> result 1:', result)

  const allValues = lines.map((line) => line.split(' | '))

  result = partTwo(allValues)

  console.log('> result 2:', result)
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
