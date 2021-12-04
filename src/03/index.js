import { readFile } from '_utils/file'

const getRaysBitOccurrences = ({ occurrencesSum, report }) => {
  const bitOneOccurrences = occurrencesSum
    .map((occurrence) => (occurrence > report.length / 2 ? '1' : '0'))
    .join('')

  const bitZeroOccurrences = bitOneOccurrences.replace(/(\d)/g, (match) =>
    match === '0' ? '1' : '0'
  )

  return {
    bitOneOccurrences,
    bitZeroOccurrences,
  }
}

const getGasBitOccurrences = ({ report, index }) =>
  report.reduce((bit, line) => (line[index] === '1' ? bit + 1 : bit), 0)

const filterLinesByBit = ({ report, index, bit }) =>
  report.filter((line) => line[index] === bit)

const partOne = (report) => {
  const OCCURRENCES = new Array(report[0].length).fill(0)

  const occurrencesSum = report.reduce(
    (occurrences, line) =>
      line.split('').reduce((occ, bit, i) => {
        occ[i] += parseInt(bit)
        return occ
      }, occurrences),
    [...OCCURRENCES]
  )

  const { bitOneOccurrences, bitZeroOccurrences } = getRaysBitOccurrences({
    occurrencesSum,
    report,
  })

  const gamma = parseInt(bitOneOccurrences, 2)
  const epsilon = parseInt(bitZeroOccurrences, 2)

  return gamma * epsilon
}

const partTwo = (report) => {
  let filteredZeroReport = report
  let filteredOneReport = report

  report[0].split('').some((_, i) => {
    if (filteredZeroReport.length > 1) {
      // the filtered ones here are different values
      const bitOcc = getGasBitOccurrences({
        report: filteredZeroReport,
        index: i,
      })

      filteredZeroReport = filterLinesByBit({
        report: filteredZeroReport,
        index: i,
        bit: bitOcc >= filteredZeroReport.length / 2 ? '0' : '1',
      })
    }

    if (filteredOneReport.length > 1) {
      // from here
      const bitOcc = getGasBitOccurrences({
        report: filteredOneReport,
        index: i,
      })

      filteredOneReport = filterLinesByBit({
        report: filteredOneReport,
        index: i,
        bit: bitOcc >= filteredOneReport.length / 2 ? '1' : '0',
      })
    }

    return filteredZeroReport.length === 1 && filteredOneReport.length === 1
  })

  const co2 = parseInt(filteredZeroReport[0], 2)
  const oxygen = parseInt(filteredOneReport[0], 2)

  return oxygen * co2
}

const solve = (report) => {
  let result = partOne(report)

  console.log('> result 1:', result)

  result = partTwo(report)

  console.log('> result 2:', result)
}

export default () => {
  console.log('--- Day 03: Binary Diagnostic ---')

  return readFile('03/input.in')
    .then((data) => {
      const report = data.split('\n')
      solve(report)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
