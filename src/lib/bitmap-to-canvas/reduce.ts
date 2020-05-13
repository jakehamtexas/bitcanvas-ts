import { BitMapMember } from '.';
import { asHex } from './asHex';
import { getLongestArrayLengthInMatrix } from './getLongestArrayLengthInMatrix';
import { primesUnderThreshhold } from './primesUnderThreshhold';

const getPrimesBelowLongestSideLength = (
  bitMap: BitMapMember[][]
): number[] => {
  const longestArrayLengthInMatrix = getLongestArrayLengthInMatrix(bitMap);
  const longestSideLength = Math.max(bitMap.length, longestArrayLengthInMatrix);

  return primesUnderThreshhold(longestSideLength);
};

const canBeEvenlyDividedIntoSquaresOfSizeN = (
  bitMap: BitMapMember[][],
  n: number
): boolean =>
  bitMap.length % n === 0 && bitMap.every(row => row.length % n === 0);

const getDividedIntoSquaresOfSizeN = (
  bitMap: BitMapMember[][],
  n: number
): BitMapMember[][][] => {
  const startPos = [0, 0];
  const squares = [];
  const getIsOutOfBounds = ([x, y]: number[]): boolean =>
    y >= bitMap.length || x >= bitMap[y].length;

  while (!getIsOutOfBounds(startPos)) {
    const [x, y] = startPos;
    const row = bitMap[y];
    const square = new Array(n).fill(null).map(_ => {
      return row.slice(x, x + n);
    });
    squares.push(square);
    const isIterationBeforeEndOfRow = x === row.length - n;
    startPos[0] += isIterationBeforeEndOfRow ? -x : n;
    startPos[1] += isIterationBeforeEndOfRow ? n : 0;
  }
  return squares;
};
const getIsComposedOfSquaresOfNLength = (
  bitMap: BitMapMember[][],
  n: number
): boolean => {
  return (
    canBeEvenlyDividedIntoSquaresOfSizeN(bitMap, n) &&
    getDividedIntoSquaresOfSizeN(bitMap, n).every(square => {
      const squareValue = asHex(square[0][0]);
      return square
        .map(row => row.map(asHex))
        .every(row => row.every(cell => cell === squareValue));
    })
  );
};

const canReduce = (bitMap: BitMapMember[][]): boolean => {
  const primes = getPrimesBelowLongestSideLength(bitMap);
  return primes.some(prime => getIsComposedOfSquaresOfNLength(bitMap, prime));
};

const getFirstPrimeMatrixCanBeEvenlyDividedInto = (
  bitMap: BitMapMember[][]
): number => {
  const primes = getPrimesBelowLongestSideLength(bitMap);
  const prime =
    primes.find(prime => canBeEvenlyDividedIntoSquaresOfSizeN(bitMap, prime)) ||
    0;
  return prime;
};

const getReduced = (bitMap: BitMapMember[][]): BitMapMember[][] => {
  const firstPrime = getFirstPrimeMatrixCanBeEvenlyDividedInto(bitMap);
  const divided = getDividedIntoSquaresOfSizeN(bitMap, firstPrime);
  const reduced: Array<Array<BitMapMember>> = [];
  let x = 0,
    y = 0;

  const possibleYPositions = bitMap.length / firstPrime;

  while (y < possibleYPositions) {
    const row = bitMap[y];
    const possibleXPositions = row.length / firstPrime;
    while (x < possibleXPositions) {
      const [[member]] = divided[x + y * possibleXPositions];
      reduced[y] = reduced[y] || [];
      reduced[y][x] = member;
      x++;
    }
    x = 0;
    y++;
  }
  return reduced;
};

export { canReduce, getReduced };
