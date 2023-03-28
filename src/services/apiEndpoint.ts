import {useMemo} from 'react';
import {useUnmount, useUpdate} from 'react-use';

import {config} from '@constants/config';

import {hasProtocol} from '@utils/strings';

import env from '../env';

type ApiEndpointListener = (apiEndpoint: string | null) => void;

// Storage for API endpoint subscriptions
const listeners = new Set<ApiEndpointListener>();

// When localStorage is not working,
// we'd like to keep it at least for the current session.
// TODO: Consider storing it in cookie or URL params as a fallback.
let cachedApiEndpoint: string | null = sanitizeApiEndpoint(localStorage.getItem(config.apiEndpoint));

function notifySubscriptions(): void {
  const endpoint = getApiEndpoint();
  listeners.forEach((listener) => listener(endpoint));
}

export function sanitizeApiEndpoint(apiEndpoint: string): string;
export function sanitizeApiEndpoint(apiEndpoint: null | undefined): null;
export function sanitizeApiEndpoint(apiEndpoint: string | null | undefined): string | null;
export function sanitizeApiEndpoint<T>(apiEndpoint: string | null | undefined): string | null {
  if (apiEndpoint == null) {
    return null;
  }

  if (!hasProtocol(apiEndpoint)) {
    apiEndpoint = `${window.location.protocol}//${apiEndpoint}`;
  }

  return apiEndpoint
    .replace(/\/+$/, '')
    .replace(/(\/v1)?$/, '/v1');
}

export function getApiEndpoint(): string | null {
  return cachedApiEndpoint || env?.apiUrl || null;
}

export function saveApiEndpoint(apiEndpoint: string): boolean {
  try {
    cachedApiEndpoint = sanitizeApiEndpoint(apiEndpoint);
    localStorage.setItem(config.apiEndpoint, cachedApiEndpoint);
    notifySubscriptions();
    return true;
  } catch (e) {
    // Safari in private mode may throw QuotaExceeded error
    notifySubscriptions();
    return false;
  }
}

export function subscribeApiEndpoint(listener: ApiEndpointListener): () => void {
  const wrappedListener: ApiEndpointListener = (apiEndpoint) => listener(apiEndpoint);
  listeners.add(wrappedListener);
  return () => listeners.delete(wrappedListener);
}

export function useApiEndpoint(): string | null {
  const update = useUpdate();
  const unsubscribe = useMemo(() => subscribeApiEndpoint(update), []);
  useUnmount(unsubscribe);
  return getApiEndpoint();
}
