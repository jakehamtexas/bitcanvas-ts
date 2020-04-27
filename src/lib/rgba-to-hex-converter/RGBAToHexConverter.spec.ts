import test from 'ava';
import { RGBAToHexConverter } from '.';

test('returns hex from rgba', t => {
  const rgba = new RGBAToHexConverter({
    red: 131,
    green: 160,
    blue: 70,
    alpha: 1
  });
  t.is('#83A046FF', rgba.toHex());
});

test('empty constructor returns black', t => {
  const rgba = new RGBAToHexConverter();
  t.is('#000000FF', rgba.toHex());
});

test('out of range args throws exception', t => {
  try {
    new RGBAToHexConverter({ red: 1000, green: -1 });
  } catch (e) {
    t.is(
      'One or more values supplied for RGBA is not valid:' +
        '\n' +
        `    Value '${1000}' is invalid for 'red'. Value must be a number between 0 and 255.` +
        '\n' +
        `    Value '${-1}' is invalid for 'green'. Value must be a number between 0 and 255.`,
      e.message
    );
  }
});
