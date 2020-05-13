import test from 'ava';
import { canReduce, getReduced } from './reduce';
const matrix = [
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [1, 1, 0, 0],
  [1, 1, 0, 0]
];

const reducedMatrix = [
  [0, 1],
  [1, 0]
];

const irreducableMatrix = [
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [1, 1, 1, 0],
  [1, 1, 0, 0]
];

const rectangularMatrix = [
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 1]
];

const reducedRectangularMatrix = [
  [0, 1, 0],
  [1, 0, 1]
];

const irreducableRectangularMatrix = [
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [1, 1, 1, 0, 1, 1],
  [1, 1, 0, 0, 1, 1]
];

test('show matrix is reducable', t => {
  t.is(canReduce(matrix), true);
});

test('show irreducable matrix is not reducable', t => {
  t.is(canReduce(irreducableMatrix), false);
});

test('show rectangular matrix is reducable', t => {
  t.is(canReduce(rectangularMatrix), true);
});

test('show irreducable rectangular matrix is not reducable', t => {
  t.is(canReduce(irreducableRectangularMatrix), false);
});

test('can reduce matrix', t => {
  t.deepEqual(getReduced(matrix), reducedMatrix);
});

test('can reduce rectangular matrix', t => {
  t.deepEqual(getReduced(rectangularMatrix), reducedRectangularMatrix);
});
