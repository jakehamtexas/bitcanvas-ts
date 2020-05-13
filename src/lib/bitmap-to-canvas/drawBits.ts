import { BitMapMember } from '.';
import { asHex } from './asHex';
import { getLongestArrayLengthInMatrix } from './getLongestArrayLengthInMatrix';

export const drawBits = (
  context: CanvasRenderingContext2D,
  imgHeightInPx: number,
  imgWidthInPx: number
) => {
  return (
    row: readonly BitMapMember[],
    rowIndex: number,
    bitMap: BitMapMember[][]
  ): void => {
    const longestArrayLengthInMatrix = getLongestArrayLengthInMatrix(bitMap);
    const bitWidthInPx = imgWidthInPx / longestArrayLengthInMatrix;
    const bitHeightInPx = imgHeightInPx / bitMap.length;

    return row.forEach((bit, bitIndex) => {
      context.strokeStyle = asHex(bit);
      const topLeftCornerXPos = imgWidthInPx - bitIndex * bitWidthInPx;
      const topLeftCornerYPos = imgHeightInPx - rowIndex * bitHeightInPx;
      context.rect(
        topLeftCornerXPos,
        topLeftCornerYPos,
        bitWidthInPx,
        bitHeightInPx
      );
      context.fill();
    });
  };
};
