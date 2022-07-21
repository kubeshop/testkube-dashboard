export const compareFiltersObject = (initialFilters: any, currentFilters: any) => {
  const keys1 = Object.keys(initialFilters);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    const val1 = initialFilters[key];
    const val2 = currentFilters[key];
    const isArrays = Array.isArray(val1) && Array.isArray(val2);
    if (isArrays) {
      if (val1.length !== val2.length) {
        return false;
      }
      // eslint-disable-next-line no-continue
      continue;
    }
    if (val1 !== val2) {
      return false;
    }
  }
  return true;
};
