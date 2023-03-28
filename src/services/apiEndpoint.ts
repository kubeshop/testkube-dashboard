import {config} from '@constants/config';

import env from '../env';

// When localStorage is not working,
// we'd like to keep it at least for the current session.
// TODO: Consider storing it in cookie or URL params as a fallback.
let cachedApiEndpoint: string | null = localStorage.getItem(config.apiEndpoint);

export function getApiEndpoint(): string | null {
  return cachedApiEndpoint || env?.apiUrl || null;
}

export function saveApiEndpoint(apiEndpoint: string): boolean {
  try {
    cachedApiEndpoint = apiEndpoint;
    localStorage.setItem(config.apiEndpoint, apiEndpoint);
    return true;
  } catch (e) {
    // Safari in private mode may throw QuotaExceeded error
    return false;
  }
}
