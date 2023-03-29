import {createElement} from 'react';
import {act, renderHook} from '@testing-library/react';

import axios from 'axios';

import {config} from '@constants/config';

import MainContext from '@contexts/MainContext';

import env from '../env';

import {
  getApiDetails,
  getApiEndpoint,
  sanitizeApiEndpoint,
  saveApiEndpoint,
  useApiEndpoint,
  useUpdateApiEndpoint,
  useWsEndpoint,
} from './apiEndpoint';

function replaceEnvEach<K extends keyof typeof env>(name: K, value: (typeof env)[K]): void {
  let restore: typeof value;
  beforeEach(() => {
    restore = env[name];
    env[name] = value;
  });
  afterEach(() => {
    env[name] = restore;
  });
}

function createAutoResetSpy(): jest.SpyInstance {
  const fetchMock = jest.fn();
  beforeEach(() => {
    fetchMock.mockReset();
  });
  return fetchMock;
}

function mockFetchEach(): jest.SpyInstance {
  const prevFetch = global.fetch;
  const fetchMock = createAutoResetSpy();
  beforeEach(() => {
    // @ts-ignore: mocking
    global.fetch = fetchMock;
  });
  afterEach(() => {
    global.fetch = prevFetch;
  });

  return fetchMock;
}

describe('services', () => {
  describe('apiEndpoint', () => {
    // Test data
    const version = 'v1.10.20';
    const commit = '2074e2d0310c357dfc6a6ab5dd326b4877d2eadf';
    const namespace = 'test-namespace';

    describe('sanitizeApiEndpoint', () => {
      it('should correctly build endpoint without protocol', () => {
        expect(sanitizeApiEndpoint('localhost:8080/v1')).toBe('http://localhost:8080/v1');
      });

      it('should correctly add missing /v1 on the end', () => {
        expect(sanitizeApiEndpoint('https://localhost:8080/')).toBe('https://localhost:8080/v1');
        expect(sanitizeApiEndpoint('http://localhost:8080')).toBe('http://localhost:8080/v1');
      });

      it('should ignore ending slashes', () => {
        expect(sanitizeApiEndpoint('http://localhost:8080/v1')).toBe('http://localhost:8080/v1');
        expect(sanitizeApiEndpoint('http://localhost:8080/v1/')).toBe('http://localhost:8080/v1');
        expect(sanitizeApiEndpoint('http://localhost:8080/v1///')).toBe('http://localhost:8080/v1');
      });

      it('should return null for empty values', () => {
        expect(sanitizeApiEndpoint(undefined)).toBe(null);
        expect(sanitizeApiEndpoint(null)).toBe(null);
        expect(sanitizeApiEndpoint('')).toBe(null);
      });
    });

    describe('getApiEndpoint', () => {
      describe('Environment variable', () => {
        replaceEnvEach('apiUrl', 'test-api-url');

        it('should sanitize endpoint from environment variable', () => {
          saveApiEndpoint('');
          expect(getApiEndpoint()).toBe('http://test-api-url/v1');
        });

        it('should prioritize local storage over environment variable', () => {
          saveApiEndpoint('http://abc/v1');
          expect(getApiEndpoint()).toBe('http://abc/v1');
        });
      });

      describe('Falling back when no environment is set', () => {
        replaceEnvEach('apiUrl', null);

        it('should be null', () => {
          saveApiEndpoint('');
          expect(getApiEndpoint()).toBe(null);
        });
      });
    });

    describe('saveApiEndpoint', () => {
      let prevBaseURL: string | undefined;
      beforeEach(() => {
        prevBaseURL = axios.defaults.baseURL;
      });
      afterEach(() => {
        axios.defaults.baseURL = prevBaseURL;
      });

      it('should allow to set the endpoint', () => {
        saveApiEndpoint('http://abc/v1');
        expect(getApiEndpoint()).toBe('http://abc/v1');
      });

      it('should allow to replace the endpoint', () => {
        saveApiEndpoint('http://abc/v1');
        saveApiEndpoint('http://def/v1');
        expect(getApiEndpoint()).toBe('http://def/v1');
      });

      it('should save the value in the localStorage', () => {
        saveApiEndpoint('abc');
        expect(localStorage.getItem(config.apiEndpoint)).toBe('http://abc/v1');
      });

      it('should change Axios\' base URL to the endpoint', () => {
        saveApiEndpoint('abc');
        expect(axios.defaults.baseURL).toBe('http://abc/v1');
      });

      it('should empty Axios\' base URL when no endpoint provided', () => {
        saveApiEndpoint('');
        expect(axios.defaults.baseURL).toBe(undefined);
      });
    });

    describe('useApiEndpoint', () => {
      it('should return the API endpoint correctly', () => {
        saveApiEndpoint('api/v1');
        const {result} = renderHook(() => useApiEndpoint());
        expect(result.current).toBe('http://api/v1');
      });

      it('should react to the API endpoint change', () => {
        saveApiEndpoint('api/v1');
        const {result, rerender} = renderHook(() => useApiEndpoint());
        act(() => {
          saveApiEndpoint('another-api/v1');
        });
        expect(result.current).toBe('http://another-api/v1');
      });
    });

    describe('useWsEndpoint', () => {
      it('should return the WS endpoint correctly', () => {
        saveApiEndpoint('api/v1');
        const {result} = renderHook(() => useWsEndpoint());
        expect(result.current).toBe('ws://api/v1');
      });

      it('should support secured connection', () => {
        saveApiEndpoint('https://api/v1');
        const {result} = renderHook(() => useWsEndpoint());
        expect(result.current).toBe('wss://api/v1');
      });

      it('should react to the API endpoint change', () => {
        saveApiEndpoint('api/v1');
        const {result, rerender} = renderHook(() => useWsEndpoint());
        act(() => {
          saveApiEndpoint('another-api/v1');
        });
        expect(result.current).toBe('ws://another-api/v1');
      });
    });

    describe('getApiDetails', () => {
      const fetchMock = mockFetchEach();

      it('should successfully obtain server info', async () => {
        fetchMock.mockImplementationOnce(async () => ({
          json: async () => ({ version, commit, namespace }),
        }));
        expect(await getApiDetails('api')).toEqual({ url: 'http://api/v1', namespace });
      });

      it('should fall back namespace to the "testkube"', async () => {
        fetchMock.mockImplementationOnce(async () => ({
          json: async () => ({ version, commit }),
        }));
        expect(await getApiDetails('api')).toEqual({ url: 'http://api/v1', namespace: 'testkube' });
      });

      it('should detect problems with server connection', async () => {
        fetchMock.mockImplementationOnce(() => Promise.reject(new Error('Server connection problem!')));

        const spy = jest.fn();
        await getApiDetails('api').catch(spy);

        expect(spy).toBeCalledWith(new Error('Server connection problem!'));
      });

      it('should detect invalid response schema from the server', async () => {
        fetchMock.mockImplementationOnce(async () => ({
          json: async () => ({ hello: 'world' }),
        }));
        const spy = jest.fn();
        await getApiDetails('api').catch(spy);
        expect(spy).toBeCalledWith(new Error('Received invalid data from the provided API endpoint'));
      });
    });

    describe('useUpdateApiEndpoint', () => {
      const fetchMock = mockFetchEach();
      const dispatch = createAutoResetSpy();
      const initialEndpoint = 'http://initial/v1';

      const wrapper = ({ children }) => createElement(MainContext.Provider, {value: {dispatch}}, children);
      const {result: {current: update}} = renderHook(() => useUpdateApiEndpoint(), {wrapper});

      beforeEach(() => {
        saveApiEndpoint(initialEndpoint);
      });

      it('should throw error when there is a problem with server', async () => {
        fetchMock.mockImplementationOnce(() => Promise.reject(new Error('Server connection problem!')));

        const spy = jest.fn();
        await update('new').catch(spy);

        expect(spy).toBeCalledWith(new Error('Server connection problem!'));
        expect(getApiEndpoint()).toBe(initialEndpoint);
        expect(dispatch).not.toBeCalled();
      });

      it('should save namespace & endpoint when the server is fine', async () => {
        fetchMock.mockImplementationOnce(async () => ({
          json: async () => ({ version, commit, namespace }),
        }));

        expect(await update('new')).toBe(true);
        expect(getApiEndpoint()).toBe('http://new/v1');
        expect(dispatch).toBeCalledWith({payload: namespace, type: 'configSlice/setNamespace'});
      });

      it('should ignore server error when race condition occurs', async () => {
        fetchMock.mockImplementationOnce(() => Promise.reject(new Error('Server connection problem!')));

        const promise = update('new');
        saveApiEndpoint('race');

        expect(await promise).toBe(false);
        expect(getApiEndpoint()).toBe('http://race/v1');
        expect(dispatch).not.toBeCalled();
      });

      it('should ignore server success when race condition occurs', async () => {
        fetchMock.mockImplementationOnce(async () => ({
          json: async () => ({ version, commit, namespace }),
        }));

        const promise = update('new');
        saveApiEndpoint('race');

        expect(await promise).toBe(false);
        expect(getApiEndpoint()).toBe('http://race/v1');
        expect(dispatch).not.toBeCalled();
      });
    });
  });
});
