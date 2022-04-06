export const areArraysEqual = (a: Array<any>, b: Array<any>) => {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
};

export const addIndexes = (results: Array<any>) => {
  if (!results || !results.length) {
    return [];
  }

  const copyResultsArray = [...results];

  return copyResultsArray.map((result: any, index: number) => {
    return {...result, index: results.length - index};
  });
};
