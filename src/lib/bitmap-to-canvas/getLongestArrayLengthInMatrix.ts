export const getLongestArrayLengthInMatrix = (bitMap: any[][]) => {
  return bitMap.reduce(
    (longestArrayLengthInMatrix, currentRow) =>
      Math.max(longestArrayLengthInMatrix, currentRow.length),
    -Infinity
  );
};
