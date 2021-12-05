import { readFile } from '_utils/file'

const sumArray = (arr) => arr.reduce((sum, v) => v + sum, 0)

const toNumberArr = (arr) => arr.map((v) => parseInt(v))

const getBoardLine = (line) =>
  toNumberArr(line.replace(/\s\s+/g, ' ').trim().split(' '))

// boards will always be 5x5 with empty first line
const getBoardsFrom = (lines) => {
  const boards = []

  for (let i = 1; i < lines.length; i += 6) {
    let board = [
      lines[i],
      lines[i + 1],
      lines[i + 2],
      lines[i + 3],
      lines[i + 4],
    ].map(getBoardLine)

    boards.push(board)
  }

  return boards
}

const getUpdatedBoard = ({ board, call }) =>
  board.map((line) => {
    const foundIndex = line.indexOf(call)
    if (foundIndex > -1) {
      const newLine = [...line]
      newLine[foundIndex] = -1
      return newLine
    }

    return line
  })

const checkBingo = (board) =>
  board.some((line, i) => {
    const column = board.map((line) => line[i])

    return sumArray(line) === -5 || sumArray(column) === -5
  })

const winnerBoardSum = (board) =>
  board.reduce(
    (sum, line) => line.reduce((lSum, el) => (el >= 0 ? lSum + el : lSum), sum),
    0
  )

const solve = ({ drawnNumbers, lines }) => {
  const drawn = toNumberArr(drawnNumbers.split(','))

  const originalBoards = getBoardsFrom(lines)
  let boards = originalBoards

  let call = 0
  let isOver = false
  let winner = -1

  for (let i = 0; i < drawn.length && !isOver; i += 1) {
    call = drawn[i]
    boards = boards.map((board, boardIndex) => {
      if (!isOver) {
        // change values
        let newBoard = getUpdatedBoard({ board, call })

        // check if this board has bingo
        if (checkBingo(newBoard)) {
          isOver = true
          winner = boardIndex
        }

        return newBoard
      }

      return board
    })
  }

  let winnerSum = winnerBoardSum(boards[winner])

  let result = winnerSum * call

  console.log('> result 1:', result)

  boards = originalBoards
  let lastBoard = []

  call = 0
  winner = -1

  for (let i = 0; i < drawn.length && boards.length > 0; i += 1) {
    call = drawn[i]
    let newBoards = []
    boards.forEach((board) => {
      // change values
      let newBoard = getUpdatedBoard({ board, call })

      if (!checkBingo(newBoard)) {
        newBoards.push(newBoard)
      }

      // store lastBoard changed as boards should be empty
      lastBoard = newBoard
    })

    boards = newBoards
  }

  // check lastBoard as it is the winner
  winnerSum = winnerBoardSum(lastBoard)

  result = winnerSum * call

  console.log('> result 2:', result)
}

export default () => {
  console.log('--- Day 04: Giant Squid ---')

  return readFile('04/input.in')
    .then((data) => {
      const [drawnNumbers, ...lines] = data.split('\n')
      solve({ drawnNumbers, lines })
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
