import { BitMapMember } from '.';
import { RGBA, RGBAToHexConverter } from '../..';

export const asHex = (member: BitMapMember) =>
  typeof member === 'string'
    ? member
    : new RGBAToHexConverter(RGBA.from(member)).toHex();
