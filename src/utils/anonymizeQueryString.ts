enum DataType {
  jwt = 'jwt',
}

const getDataType = (value: unknown): DataType | null => {
  if (!value) {
    return null;
  }
  if (/^[a-z0-9-_]{2,}\.[a-z0-9-_]{2,}\.[a-z0-9-_]{2,}$/i.test(`${value}`)) {
    return DataType.jwt;
  }
  return null;
};

export const anonymizeQueryString = (qs: string): string => {
  const params = new URLSearchParams(qs);
  Array.from(params.entries()).forEach(([key, value]) => {
    const type = getDataType(value);
    if (type) {
      params.set(key, `anon:${type}`);
    }
  });
  const result = params.toString();
  return /^\?*$/.test(result) ? '' : result.replace(/^\?*/, '?');
};
