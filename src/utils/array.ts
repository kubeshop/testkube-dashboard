export const areArraysEqual = (a: Array<any>, b: Array<any>) => {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
};

export const addIndexes = (results: any[]) => {
  if (!results || !results.length) {
    return [];
  }

  const copyResultsArray = [...results];

  return copyResultsArray.map((result: any, index: number) => {
    return {...result, index: results.length - index};
  });
};

export const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
