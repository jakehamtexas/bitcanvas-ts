import { BitMapMember } from '.';
import { drawBits } from './drawBits';
import { canReduce, getReduced } from './reduce';

export default class BitMapToCanvas {
  public bitMap: BitMapMember[][];
  constructor(bitMap: BitMapMember[][] = new Array<BitMapMember[]>()) {
    this.bitMap = bitMap;
  }

  public Normalize(): BitMapToCanvas {
    if (canReduce(this.bitMap)) {
      this.bitMap = getReduced(this.bitMap);
      this.Normalize();
      return this;
    }
    return this;
  }

  public ToCanvas(
    imgHeightInPx: number,
    imgWidthInPx: number
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
    context.beginPath();
    this.bitMap.forEach(drawBits(context, imgHeightInPx, imgWidthInPx));
    return canvas;
  }
}
