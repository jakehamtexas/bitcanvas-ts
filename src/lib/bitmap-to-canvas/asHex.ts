import { BitMapMember } from '.';
import { RGBAToHexConverter, RGBA } from '../rgba-to-hex-converter';

export const asHex = (member: BitMapMember) =>
  typeof member === 'string'
    ? member
    : new RGBAToHexConverter(RGBA.from(member)).toHex();
