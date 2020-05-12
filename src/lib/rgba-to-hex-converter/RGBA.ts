import IRGBA from './IRGBA';

export class RGBA {
  public static from(member: number | IRGBA): IRGBA {
    if (member) {
      if (member === 1) {
        return {
          red: 0,
          green: 0,
          blue: 0,
          alpha: 1
        };
      }
      if (member instanceof Object) {
        return member;
      }
    }
    return {
      red: 255,
      blue: 255,
      green: 255
    };
  }
}
