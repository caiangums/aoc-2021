import { readFile } from '_utils/file'

const toNumberArray = (arr) => arr.map((v) => parseInt(v))

const BORN_FISH_TIMER = 8

const MAX_FISH_TIMER = 6

const MIN_FISH_TIMER = 0

const PART_ONE_DAYS = 80

const PART_TWO_DAYS = 256

const updateSea = ({ sea, days }) => {
  let actualSea = Array.from(sea)

  for (let i = 0; i < days; i += 1) {
    let updatedSea = []

    let newFishes = []

    actualSea.forEach((fish) => {
      if (fish === MIN_FISH_TIMER) {
        updatedSea.push(MAX_FISH_TIMER)
        newFishes.push(BORN_FISH_TIMER)
      } else {
        updatedSea.push(fish - 1)
      }
    })

    actualSea = [...updatedSea, ...newFishes]
  }

  return actualSea.length

}

const solve = (line) => {
  let sea = toNumberArray(line.split(','))

  const partOneSea = updateSea({ sea, days: PART_ONE_DAYS })

  console.log('> result 1:', partOneSea)

  /*
  // TODO: do not use bruteforce, pls
  const partTwoSea = updateSea({ sea, days: PART_TWO_DAYS })

  console.log('> result 2:', partTwoSea)
  */
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
