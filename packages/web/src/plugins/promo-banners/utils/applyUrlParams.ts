export const applyUrlParams = (url: string, params: Record<string, string | undefined>): string =>
  url.replace(/(^|\/)\{([^}]+)}/g, (_, prefix, param) => `${prefix}${encodeURIComponent(params[param] || '')}`);
