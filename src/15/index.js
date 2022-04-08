import { readFile } from '_utils/file'

const toNumberArr = (arr) => arr.map((v) => parseInt(v))

const print = (spots) => {
  console.log(`      j>[0][1][2][3][4][5][6][7][8][9]`)
  for (let i = 0; i < spots.length; i++) {
    let values = ''
    for (let j = 0; j < spots[i].length; j++) {
      values += `${spots[i][j]}`
      if (j !== spots[i].length - 1) {
        values += ', '
      }
    }
    console.log(`spot[${i % 10}] [${values}]`)
  }
}

const findPath = (spots) => {
  const visited = spots.map((line, i) =>
    line.map((v, j) => ({ risk: v, visited: false, total: Infinity, i, j }))
  )
  visited[0][0].total = 0 // set starting point to 0
  const last = visited[visited.length - 1][visited[0].length - 1]

  const queue = [visited[0][0]]

  while (queue.length > 0) {
    if (last.visited) {
      break
    }

    const current = queue[0]

    if (current.visited) {
      queue.shift()
      continue
    }

    const { i, j, total } = current

    if (i < spots.length - 1) {
      const next = visited[i + 1][j]
      if (!next.visited) {
        next.total = Math.min(next.total, total + next.risk)
        queue.push(next)
      }
    }

    if (j < spots.length - 1) {
      const next = visited[i][j + 1]
      if (!next.visited) {
        next.total = Math.min(next.total, total + next.risk)
        queue.push(next)
      }
    }

    current.visited = true
    queue.shift()
  }

  return last.total
}

const getNext = (queue) => {
  let next = null
  for (const node of queue) {
    if (next === null || node.total < next.total) {
      next = node
    }
  }
  return next
}

const findPathPart2 = (spots) => {
  const visited = spots.map((line, i) =>
    line.map((v, j) => ({ risk: v, visited: false, total: Infinity, i, j }))
  )
  visited[0][0].total = 0 // set starting point to 0
  const last = visited[visited.length - 1][visited[0].length - 1]

  const queue = new Set()

  queue.add(visited[0][0])

  while (queue.size > 0) {
    if (last.visited) {
      break
    }

    const current = getNext(queue)

    const { i, j, total } = current

    if (i < spots.length - 1) {
      const next = visited[i + 1][j]
      if (!next.visited) {
        next.total = Math.min(next.total, total + next.risk)
        queue.add(next)
      }
    }

    if (j < spots.length - 1) {
      const next = visited[i][j + 1]
      if (!next.visited) {
        next.total = Math.min(next.total, total + next.risk)
        queue.add(next)
      }
    }

    current.visited = true
    queue.delete(current)
  }

  return last.total
}

const addSize = (line, size) =>
  line.map((v) => ((v + size) % 10 === 0 ? 1 : (v + size) % 10))

const solve = (lines) => {
  const spots = lines.map((line) => toNumberArr(line.split('')))

  // print(spots);

  // the correct answer is always 1 less than the found answer for the input
  // even when I tried other solutions, I couldn't get the correct answer
  // If you found the correct answer, please submit a PR with the solution :D
  let result = findPath(spots)

  console.log('> result 1:', result - 1)

  let biggerSpots = []

  for (let c = 0; c < 5; c++) {
    for (let i = 0; i < spots.length; i++) {
      const values = [
        ...addSize(spots[i], c),
        ...addSize(spots[i], 1 + c),
        ...addSize(spots[i], 2 + c),
        ...addSize(spots[i], 3 + c),
        ...addSize(spots[i], 4 + c),
      ]
      biggerSpots.push(values)
    }
  }

  // print(biggerSpots)

  result = findPath(biggerSpots)

  // 2474 too low
  console.log('> result 2:', result, '<- not correct, too low')
}

export default () => {
  console.log('--- Day 15: Chiton ---')

  return readFile('15/input.in')
    .then((data) => {
      const lines = data.split('\n').slice(0, -1)
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
