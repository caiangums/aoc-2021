import { readFile } from '_utils/file'

const DEPTH = {
  up: 'up',
  down: 'down',
}

const POSITION = 'forward'

const solve = (commands) => {
  let position = 0
  let depth = 0

  commands.some(([command, value]) => {
    if (Object.keys(DEPTH).includes(command)) {
      if (DEPTH.up === command) {
        depth += value
        return
      }

      depth -= value
    }

    if (POSITION === command) {
      position += value
    }
  })

  let result = Math.abs(position * depth)

  console.log('> result 1:', result)

  let aim = 0
  position = 0
  depth = 0

  commands.some(([command, value]) => {
    if (Object.keys(DEPTH).includes(command)) {
      if (DEPTH.down === command) {
        aim += value
        return
      }

      aim -= value
    }

    if (POSITION === command) {
      position += value
      depth += aim * value
    }
  })

  result = Math.abs(position * depth)

  console.log('> result 2:', result)
}

export default () => {
  console.log('--- Day 02: Dive! ---')

  return readFile('02/input.in')
    .then((data) => {
      const commands = data.split('\n').map((commandLine) => {
        const [command, value] = commandLine.split(' ')

        return [command, parseInt(value)]
      })
      solve(commands)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
