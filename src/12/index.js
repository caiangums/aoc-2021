import { readFile } from '_utils/file'

const START = 'start'
const END = 'end'

function Graph() {
  const nodes = new Map()

  const add = (from, to) => {
    const fromConnections = nodes.has(from) ? nodes.get(from) : []
    const toConnections = nodes.has(to) ? nodes.get(to) : []

    if (!fromConnections.includes(to)) {
      nodes.set(from, [...fromConnections, to])
    }

    if (to !== END && !toConnections.includes(to)) {
      nodes.set(to, [...toConnections, from])
    }
  }

  const see = () => console.log(nodes)

  const get = (from) => nodes.get(from)

  return {
    see,
    add,
    get,
  }
}

const isUpperCase = (str) => str === str.toUpperCase()

const isOver = (pathes) => !pathes.some((path) => !path.includes(END))

const getAllPathes = ({ graph, from = START }) => {
  let run = true
  let actual = from
  let pathes = [[actual]]

  while (run) {
    let newPathes = []

    pathes.forEach((actualPath) => {
      if (!actualPath.includes(END)) {
        let options = graph.get(actualPath[actualPath.length - 1])

        options.forEach((option) => {
          if (isUpperCase(option)) {
            newPathes.push([...actualPath, option])
          } else {
            if (!actualPath.includes(option)) {
              newPathes.push([...actualPath, option])
            }
          }
        })
      } else {
        newPathes.push(actualPath)
      }
    })

    pathes = newPathes

    run = !isOver(pathes)
  }

  return pathes
}

const solve = (lines) => {
  const graph = Graph()

  lines.forEach((line) => {
    const [from, to] = line.split('-')
    graph.add(from, to)
  })

  const pathes = getAllPathes({ graph })

  let result = pathes.length

  console.log('> result 1:', result)

  // and the second part here
  // console.log('> result 2:')
}

export default () => {
  console.log('--- Day 12: Passage Pathing ---')

  return readFile('12/input.in')
    .then((data) => {
      const lines = data.split('\n').slice(0, -1)
      solve(lines)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
