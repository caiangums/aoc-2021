import { readFile } from '_utils/file'

const toNumberArray = (arr) => arr.map((v) => parseInt(v))

const getFolded = ({ value, fold }) =>
  value % fold === 0 ? 0 : fold - (value % fold)

const getResultOfOneFolding = ({ dots, fold }) =>
  dots.reduce((acc, dot) => {
    let [x, y] = toNumberArray(dot.split(','))
    const foldV = fold[1]

    if (fold[0] === 'x') {
      if (x >= foldV) {
        if (x > foldV) {
          const newDot = `${getFolded({ value: x, fold: foldV })},${y}`

          acc.add(newDot)
        }
        return acc
      }
    } else {
      if (y >= foldV) {
        if (y > foldV) {
          const newDot = `${x},${getFolded({ value: y, fold: foldV })}`

          acc.add(newDot)
        }

        return acc
      }
    }

    acc.add(dot)
    return acc
  }, new Set())

const doAllFoldings = ({ dots, folds }) => {
  let actualDots = dots

  folds.forEach((fold) => {
    const foldedSet = getResultOfOneFolding({ dots: actualDots, fold })

    actualDots = Array.from(foldedSet)
  })

  return actualDots
}

const printFinalFolded = (folded) => {
  let xMax = 0
  let yMax = 0

  folded.forEach((v) => {
    const [x, y] = toNumberArray(v.split(','))

    if (x > xMax) xMax = x
    if (y > yMax) yMax = y
  })

  let result = []

  for (let i = 0; i <= yMax; i += 1) {
    result[i] = []
    for (let j = 0; j <= xMax; j += 1) {
      result[i].push(folded.includes(`${j},${i}`) ? '#' : '.')
    }
  }

  result.forEach((v) => {
    console.log(v.join(''))
  })
}

const solve = (lines) => {
  const dots = [],
    folds = []

  lines.forEach((line) => {
    if (line.includes(',')) {
      dots.push(line)
    }

    if (line.includes('=')) {
      const [_match, el, fold] = line.match(/(x|y)=(\d*)/)
      folds.push([el, parseInt(fold)])
    }
  })

  const foldedSet = getResultOfOneFolding({ dots, fold: folds[0] })

  console.log('> result 1:', foldedSet.size)

  const result = doAllFoldings({ dots, folds })

  console.log('> result 2:')

  printFinalFolded(result)
}

export default () => {
  console.log('--- Day 13: Transparent Origami ---')

  return readFile('13/input.in')
    .then((data) => {
      const lines = data.split('\n')
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
