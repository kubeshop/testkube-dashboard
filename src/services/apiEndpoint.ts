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
    axios.defaults.baseURL = cachedApiEndpoint;
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

export function useWsEndpoint(): string | null {
  const apiEndpoint = useApiEndpoint();
  return useMemo(() => {
    if (apiEndpoint === null) {
      return null;
    }
    return apiEndpoint.replace(/^http(?=s?:\/\/)/, 'ws');
  }, [apiEndpoint]);
}

export async function getApiDetails(apiEndpoint: string): Promise<ApiDetails> {
  const url = sanitizeApiEndpoint(apiEndpoint);

  const data = await fetch(`${url}/info`).then(res => res.json());
  if (!data?.version || !data?.commit) {
    throw new Error('Received invalid data from provided API endpoint');
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
