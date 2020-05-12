import IRGBA from './IRGBA';
import { isInRange } from './isInRange';
import { throwException } from './throwException';
const isValid = (colors: readonly number[], alpha: number) =>
  colors.every(isInRange) && alpha <= 1 && alpha >= 0;

const getFormattedHex = (n: number) =>
  n
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');
export class RGBAToHexConverter {
  private readonly _red: number;
  private readonly _green: number;
  private readonly _blue: number;
  private readonly _alpha: number;
  constructor(
    { red = 0, green = 0, blue = 0, alpha = 1 }: IRGBA = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1
    }
  ) {
    if (!isValid([red, green, blue], alpha)) {
      throwException(red, green, blue, alpha);
    }

    this._red = red;
    this._green = green;
    this._blue = blue;
    this._alpha = alpha;
  }

  public toHex(): string {
    const colors: ReadonlyArray<any> = [this._red, this._green, this._blue];
    const colorsAsHex = colors.reduce(
      (asHex, color) => asHex + getFormattedHex(color),
      ''
    );
    const alphaAsHex = getFormattedHex(Math.ceil(this._alpha * 255));
    return `#${colorsAsHex}${alphaAsHex}`;
  }
}
