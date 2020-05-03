import { BitMapMember } from '.';

const getCanReduce = (bitMap: BitMapMember[][]): boolean => {
  return !!bitMap;
};

const getReduced = (bitMap: BitMapMember[][]) => {
  return bitMap;
};
export default class BitMapToCanvas {
  public bitMap: BitMapMember[][];
  constructor(bitMap: BitMapMember[][] = new Array<Array<BitMapMember>>()) {
    this.bitMap = bitMap;
  }

  public Normalize(): BitMapToCanvas {
    const canReduce = getCanReduce(this.bitMap);
    if (canReduce) {
      this.bitMap = getReduced(this.bitMap);
      this.Normalize();
      return this;
    }
    return this;
  }

  public ToCanvas(): CanvasRenderingContext2D {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
    return context;
  }
}
