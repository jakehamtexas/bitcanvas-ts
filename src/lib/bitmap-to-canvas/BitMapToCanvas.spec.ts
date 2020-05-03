import test from 'ava';
import BitMapToCanvas from './BitMapToCanvas';

test('normalize reduces reducable square matrices', t => {
  const bitMapToCanvas = new BitMapToCanvas([
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [1, 1, 0, 0],
    [1, 1, 0, 0]
  ]);
  bitMapToCanvas.Normalize();
  const reduced = [
    [0, 1],
    [1, 0]
  ];
  t.deepEqual(bitMapToCanvas.bitMap, reduced);
});

test('normalize does not reduce irreducable square matrices', t => {
  const irreducable = [
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [1, 1, 0, 0],
    [1, 1, 0, 0]
  ];
  const bitMapToCanvas = new BitMapToCanvas(irreducable.map(arr => [...arr]));
  bitMapToCanvas.Normalize();
  t.deepEqual(bitMapToCanvas.bitMap, irreducable);
});

test('normalize reduces reducable rectangular matrices', t => {
  const bitMapToCanvas = new BitMapToCanvas([
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1]
  ]);
  bitMapToCanvas.Normalize();
  const reduced = [
    [0, 1, 0],
    [1, 0, 1]
  ];
  t.deepEqual(bitMapToCanvas.bitMap, reduced);
});

test('normalize does not reduce irreducable rectangular matrices', t => {
  const irreducable = [
    [0, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 0]
  ];
  const bitMapToCanvas = new BitMapToCanvas(irreducable.map(arr => [...arr]));
  bitMapToCanvas.Normalize();
  t.deepEqual(bitMapToCanvas.bitMap, irreducable);
});

test('normalize does not reduce jagged matrices', t => {
  const irreducable = [
    [0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1],
    [1, 0],
    [1, 1, 0, 0, 1, 0]
  ];
  const bitMapToCanvas = new BitMapToCanvas(irreducable.map(arr => [...arr]));
  bitMapToCanvas.Normalize();
  t.deepEqual(bitMapToCanvas.bitMap, irreducable);
});
