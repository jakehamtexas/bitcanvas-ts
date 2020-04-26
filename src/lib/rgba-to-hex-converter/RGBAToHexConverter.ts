import { isInRange } from './isInRange';
import { throwException } from './throwException';
import RGBA from './RGBA';
const isValid = (colors: number[], alpha: number) =>
  colors.every(isInRange) && alpha <= 1 && alpha >= 0;
export class RGBAToHexConverter {
  private _red: number;
  private _green: number;
  private _blue: number;
  private _alpha: number;
  constructor(
    { red = 0, green = 0, blue = 0, alpha = 1 }: RGBA = {
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
    const colors = [this._red, this._green, this._blue];
    const colorsAsHex = colors.reduce(
      (asHex, color) => asHex + color.toString(16).toUpperCase(),
      ''
    );
    const alphaAsHex = Math.ceil(this._alpha * 255)
      .toString(16)
      .toUpperCase();
    return `#${colorsAsHex}${alphaAsHex}`;
  }
}
