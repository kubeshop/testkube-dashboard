export const pick = <T, K extends keyof T>(value: T, keys: K[]): Record<K, T> => {
  const result: Partial<Record<K, T>> = {};
  keys.forEach(key => {
    result[key] = value?.[key] as any;
  });
  return result as Record<K, T>;
};

// TODO: Optimize
export const shallowEqual = (a: any, b: any): boolean => {
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a !== 'object') {
    return a === b;
  }
  if (a === null || b === null) {
    return a === b;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  return aKeys.length === bKeys.length && aKeys.every(key => a[key] === b[key]);
};

export const defaults = <T extends Record<string, any>, U extends Record<string, any>>(
  a: T,
  b: U
): {[K in keyof T]: U extends Record<K, any> ? U[K] : T[K]} => {
  const result: any = {...a};
  Object.keys(b).forEach(key => {
    if (b[key] !== undefined) {
      result[key] = b[key];
    }
  });
  return result;
};
