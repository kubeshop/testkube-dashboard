import {useContext, useMemo} from 'react';
import {useUnmount, useUpdate} from 'react-use';

import axios from 'axios';

import {config} from '@constants/config';

import {setNamespace} from '@redux/reducers/configSlice';

import {hasProtocol} from '@utils/strings';

import {MainContext} from '@contexts';

import env from '../env';

export type ApiEndpointListener = (apiEndpoint: string | null) => void;

export interface ApiDetails {
  url: string;
  namespace: string;
}

interface ApiEndpointConfig {
  suffix?: string;
  useWsEndpoint: (apiEndpoint: string | null) => string | null;
}

let endpointConfig: ApiEndpointConfig = {
  suffix: '/v1',
  useWsEndpoint: (apiEndpoint) => useMemo(
  () => (apiEndpoint ? apiEndpoint.replace(/^http(?=s?:\/\/)/, 'ws') : null),
  [apiEndpoint, endpointConfig.useWsEndpoint],
  ),
};

export const setApiEndpointConfig = (newConfig: ApiEndpointConfig): void => {
  endpointConfig = newConfig;
  notifySubscriptions();
  axios.defaults.baseURL = getApiEndpoint() || undefined;
};

// Storage for API endpoint subscriptions
const listeners = new Set<ApiEndpointListener>();

// When localStorage is not working,
// we'd like to keep it at least for the current session.
// TODO: Consider storing it in cookie or URL params as a fallback.
let cachedApiEndpoint: string | null = sanitizeApiEndpoint(localStorage.getItem(config.apiEndpoint));

// Set up Axios
axios.defaults.baseURL = getApiEndpoint() || undefined;

function notifySubscriptions(): void {
  const endpoint = getApiEndpoint();
  listeners.forEach((listener) => listener(endpoint));
}

export function isApiEndpointLocked(): boolean {
  return Boolean(env?.apiUrl);
}

export function sanitizeApiEndpoint(apiEndpoint: string): string;
export function sanitizeApiEndpoint(apiEndpoint: null | undefined): null;
export function sanitizeApiEndpoint(apiEndpoint: string | null | undefined): string | null;
export function sanitizeApiEndpoint<T>(apiEndpoint: string | null | undefined): string | null {
  if (!apiEndpoint) {
    return null;
  }

  if (!hasProtocol(apiEndpoint)) {
    apiEndpoint = `${window.location.protocol}//${apiEndpoint}`;
  }

  apiEndpoint = apiEndpoint.replace(/\/+$/, '');
  if (endpointConfig.suffix && !apiEndpoint.endsWith(endpointConfig.suffix)) {
    apiEndpoint += endpointConfig.suffix;
  }
  return apiEndpoint;
}

export function getApiEndpoint(): string | null {
  return sanitizeApiEndpoint(env?.apiUrl) || cachedApiEndpoint || null;
}

export function saveApiEndpoint(apiEndpoint: string): boolean {
  try {
    cachedApiEndpoint = sanitizeApiEndpoint(apiEndpoint);
    axios.defaults.baseURL = cachedApiEndpoint || undefined;
    localStorage.setItem(config.apiEndpoint, cachedApiEndpoint);
    notifySubscriptions();
    return true;
  } catch (e) {
    // Safari in private mode may throw QuotaExceeded error
    notifySubscriptions();
    return false;
  }
}

function subscribeApiEndpoint(listener: ApiEndpointListener): () => void {
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

export function useWsEndpoint(): string | null {
  return endpointConfig.useWsEndpoint(useApiEndpoint());
}

export async function getApiDetails(apiEndpoint: string): Promise<ApiDetails> {
  const url = sanitizeApiEndpoint(apiEndpoint);

  const data = await fetch(`${url}/info`).then(res => res.json());
  if (!data?.version || !data?.commit) {
    throw new Error('Received invalid data from the provided API endpoint');
  }

  return { url, namespace: data.namespace || 'testkube' };
}

export function useUpdateApiEndpoint(): (apiEndpoint: string) => Promise<boolean> {
  const {dispatch} = useContext(MainContext);

  return useMemo(() => async (apiEndpoint: string) => {
    const prevApiEndpoint = getApiEndpoint();
    try {
      const {url, namespace} = await getApiDetails(apiEndpoint);

      // Handle race condition, when endpoint has been changed already.
      if (getApiEndpoint() !== prevApiEndpoint) {
        return false;
      }

      saveApiEndpoint(url);
      dispatch(setNamespace(namespace));

      return true;
    } catch (error) {
      // Handle race condition, when endpoint has been changed already.
      if (getApiEndpoint() !== prevApiEndpoint) {
        return false;
      }

      throw error;
    }
  }, [dispatch]);
}
