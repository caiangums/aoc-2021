import { readFile } from '_utils/file'

const toNumberArray = (arr) => arr.map((v) => parseInt(v))

const PART_ONE_DAYS = 80

const PART_TWO_DAYS = 256

const DAYS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const STARTING_SEA = DAYS.reduce((acc, day) => acc.set(day, 0), new Map())

const updateSea = ({ sea, days }) => {
  let actualSea = new Map(STARTING_SEA)

  sea.forEach((fish) => {
    const children = actualSea.get(fish)
    actualSea.set(fish, children + 1)
  })

  for (let i = 0; i < days; i += 1) {
    let newSea = new Map()

    DAYS.forEach((day) => {
      if (day === 0) {
        // newborns
        const children = actualSea.get(day)
        newSea.set(8, children)

        // starting pregnancy
        newSea.set(6, children)
      } else {
        // passing days of pregnancy
        const children = actualSea.get(day)
        const updatedChildren = newSea.has(day - 1)
          ? newSea.get(day - 1) + children
          : children
        newSea.set(day - 1, updatedChildren)
      }
    })

    actualSea = new Map(newSea)
  }

  return DAYS.reduce((sum, day) => sum + actualSea.get(day), 0)
}

const solve = (line) => {
  let sea = toNumberArray(line.split(','))

  let partOneSea = updateSea({ sea, days: PART_ONE_DAYS })

  console.log('> result 1:', partOneSea)

  const partTwoSea = updateSea({ sea, days: PART_TWO_DAYS })

  console.log('> result 2:', partTwoSea)
}

export default () => {
  console.log('--- Day 06: Lanternfish ---')

  return readFile('06/input.in')
    .then((data) => {
      const [line] = data.split('\n')
      solve(line)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
