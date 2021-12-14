import { readFile } from '_utils/file'

const processLine = (line) => {
  let prevLine = line
  let actualLine = line

  while (true) {
    actualLine = prevLine.replace(/(\(\)|\[\]|\{\}|<>)/g, '')

    if (actualLine.length === 0 || actualLine === prevLine) {
      return actualLine
    }

    prevLine = actualLine
  }

  return actualLine
}

const CORRUPTED_VALUES = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const CORRUPTED_OPTIONS = /(\(|\[|\{|\<)(\)|\]|\}|\>)/

const findCorruptedChar = (line) => {
  const [_match, _openingChar, closingChar] =
    line.match(CORRUPTED_OPTIONS) || []

  return closingChar
}

const CLOSING_CHARS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const convertMissingIncomplete = (line) =>
  line
    .split('')
    .reduce((newLine, char) => [CLOSING_CHARS[char], ...newLine], [])

const CLOSING_VALUES = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const sumClosingChars = (closingChars) =>
  closingChars.reduce((sum, char) => sum * 5 + CLOSING_VALUES[char], 0)

const solve = (lines) => {
  const corruptedChars = []
  const missingClosing = []

  lines.forEach((line) => {
    const processedLine = processLine(line)
    if (processedLine.length > 0) {
      const corruptedChar = findCorruptedChar(processedLine)
      if (corruptedChar) {
        corruptedChars.push(corruptedChar)
      } else {
        missingClosing.push(convertMissingIncomplete(processedLine))
      }
    }
  })

  let result = corruptedChars.reduce(
    (sum, char) => CORRUPTED_VALUES[char] + sum,
    0
  )

  console.log('> result 1:', result)

  const missingClosingLineSums = missingClosing
    .map((closingChars) => sumClosingChars(closingChars))
    .sort((a, b) => a - b)

  result = missingClosingLineSums[Math.floor(missingClosing.length / 2)]

  console.log('> result 2:', result)
}

export default () => {
  console.log('--- Day 10: Syntax Scoring ---')

  return readFile('10/input.in')
    .then((data) => {
      const lines = data.split('\n').slice(0, -1)
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
