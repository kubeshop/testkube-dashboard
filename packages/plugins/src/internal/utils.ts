export const pick = <T, K extends keyof T>(value: T, keys: K[]): Record<K, T> => {
  const result: Partial<Record<K, T>> = {};
  keys.forEach(key => {
    result[key] = value?.[key] as any;
  });
  return result as Record<K, T>;
};
