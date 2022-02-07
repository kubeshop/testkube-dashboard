export const areArraysEqual = (a: Array<any>, b: Array<any>) => {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
};
