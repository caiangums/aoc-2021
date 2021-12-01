import { readFile } from '_utils/file'

const solve = (measurements) => {
  let increaseTimes = -1 // first one will always increase
  let previous = 0

  measurements.forEach((measurement) => {
    const actual = parseInt(measurement)
    if (actual > previous) {
      increaseTimes += 1
    }

    previous = actual
  })

  console.log('> result 1:', increaseTimes)

  let windowIncreaseTimes = -1 // first one will always increase
  previous = 0

  measurements.forEach((measurement, i) => {
    if (i < measurements.length - 3) {
      const actual =
        parseInt(measurement) +
        parseInt(measurements[i + 1]) +
        parseInt(measurements[i + 2])

      if (actual > previous) {
        windowIncreaseTimes += 1
      }

      previous = actual
    }
  })

  console.log('> result 2:', windowIncreaseTimes)
}

export default () => {
  console.log('--- Day 01: Sonar Sweep ---')

  return readFile('01/input.in')
    .then((data) => {
      const measurements = data.split('\n')
      solve(measurements)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
