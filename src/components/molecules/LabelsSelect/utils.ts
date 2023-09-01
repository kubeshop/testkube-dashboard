export const decomposeLabels = (labels: readonly string[]): Record<string, string> => {
  return labels.reduce((previousValue, currentValue: string) => {
    if (!currentValue.includes(':')) {
      return {...previousValue, [currentValue]: ''};
    }
    const [key, ...rest] = currentValue.split(':');
    const value = rest.join(':');
    return {...previousValue, [key.trim()]: value.trim()};
  }, {});
};

export const composeLabels = (labelsObject?: Record<string, string>): string[] => {
  return Object.entries(labelsObject || {}).map(([key, value]) => `${key}${value ? `:${value}` : ''}`);
};

export const labelRegex =
  /^(([A-Za-z0-9][-A-Za-z0-9_./]*)?[A-Za-z0-9]:\s?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])+)$/;
