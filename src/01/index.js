import { readFile } from '_utils/file'

const STARTING_COUNTER = 0

const getWindowSum = (measurements, index) =>
  measurements
    .slice(index, index + 3)
    .reduce((sum, value) => parseInt(value) + sum, 0)

const solve = (measurements) => {
  const increaseTimes = measurements
    .slice(1)
    .reduce(
      (times, measurement, index) =>
        parseInt(measurement) > parseInt(measurements[index])
          ? times + 1
          : times,
      STARTING_COUNTER
    )

  console.log('> result 1:', increaseTimes)

  const windowIncreaseTimes = measurements
    .slice(2, -3)
    .reduce(
      (times, _measurement, i) =>
        getWindowSum(measurements, i) > getWindowSum(measurements, i - 1)
          ? times + 1
          : times,
      STARTING_COUNTER
    )

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
