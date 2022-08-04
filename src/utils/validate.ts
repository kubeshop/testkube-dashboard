export const validateDuplicateValueByKey = (value: string, list: any[], key: string) => {
  let duplicateFlag = false;
  // eslint-disable-next-line no-restricted-syntax
  for (let i in list) {
    if (value === list[i][key] && Boolean(value)) {
      if (duplicateFlag) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return true;
      }
      duplicateFlag = true;
    }
  }
  return false;
};
