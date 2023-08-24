export const composeHeaders = (headers: {key: string; value: string}[]): Record<string, string> => {
  if (!headers) {
    return {};
  }

  return headers.reduce((acc, header) => {
    acc[header.key] = header.value;

    return acc;
  }, {} as Record<string, string>);
};

export const decomposeHeaders = (headers: Record<string, string>): {key: string; value: string}[] => {
  return Object.entries(headers).map(([key, value]) => {
    return {key, value};
  });
};
