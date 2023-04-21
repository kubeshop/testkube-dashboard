import {useRef} from 'react';
import {useDebounce, useInterval, useLatest, useUpdate} from 'react-use';

import {NamePath} from 'antd/lib/form/interface';

import {isEqual} from 'lodash';

import {dummySecret} from '@utils/sources';

const fieldsNames: string[] = ['uri', 'token', 'username', 'branch', 'path'];

const authSearchString = 'username or token:';
const uriSearchString = 'uri:';
const branchSearchString = 'branch:';
const pathSearchString = 'path:';
const endSearchString = ', context';

const getErrorMessage = (rawErrorString: string, searchString: string) =>
  rawErrorString.slice(
    rawErrorString.indexOf(searchString) + searchString.length,
    rawErrorString.indexOf(endSearchString)
  );

const useValidateRepository = (
  getFieldValue: (name: NamePath) => string,
  setValidationState: React.Dispatch<any>,
  validateRepository: any
) => {
  const getValues = () => ({
    uri: getFieldValue('uri') || '',
    tokenSecret: getFieldValue('tokenSecret') || '',
    usernameSecret: getFieldValue('usernameSecret') || '',
    token: getFieldValue('token') || '',
    username: getFieldValue('username') || '',
    branch: getFieldValue('branch') || '',
    path: getFieldValue('path') || '',
  });

  const latestRef = useLatest(getValues());
  const validatedRef = useRef<typeof latestRef.current>(getValues());
  const {current} = latestRef;

  // Speed up rendering the change
  const update = useUpdate();
  useInterval(() => {
    if (!isEqual(getValues(), latestRef.current)) {
      update();
    }
  }, 100);

  const getValidationPayload = () => {
    return {
      type: 'git',
      ...fieldsNames.reduce((acc, name) => {
        if (name === 'token' && current[name] === dummySecret && current.tokenSecret) {
          return {
            ...acc,
            tokenSecret: current.tokenSecret,
          };
        }

        if (name === 'username' && current[name] === dummySecret && current.usernameSecret) {
          return {
            ...acc,
            usernameSecret: current.usernameSecret,
          };
        }
        return {...acc, [name]: current[name as keyof typeof current]};
      }, {}),
    };
  };

  const handleResponse = (res: any) => {
    if (!isEqual(latestRef.current, current)) {
      return;
    }

    // Save information about the last response
    validatedRef.current = current;

    if (res?.error) {
      const errorDetail = res?.error?.data?.detail;

      if (!errorDetail) {
        setValidationState({
          message: 'Network error',
          uri: 'error',
        });
        return;
      }

      if (errorDetail.includes(authSearchString)) {
        setValidationState({
          message: getErrorMessage(errorDetail, authSearchString),
          uri: 'error',
          token: current.token ? 'error' : '',
          username: current.username ? 'error' : '',
        });
        return;
      }
      if (errorDetail.includes(uriSearchString)) {
        setValidationState({
          message: getErrorMessage(errorDetail, uriSearchString),
          uri: 'error',
        });
        return;
      }

      if (errorDetail.includes(branchSearchString)) {
        setValidationState({
          message: getErrorMessage(errorDetail, branchSearchString),
          uri: 'success',
          token: current.token ? 'success' : '',
          username: current.username ? 'success' : '',
          branch: 'error',
        });
        return;
      }

      if (errorDetail.includes(pathSearchString)) {
        setValidationState({
          message: getErrorMessage(errorDetail, pathSearchString),
          uri: 'success',
          token: current.token ? 'success' : '',
          username: current.username ? 'success' : '',
          branch: current.branch ? 'success' : '',
          path: 'error',
        });
        return;
      }

      setValidationState({
        message: 'Unknown error',
        uri: 'error',
      });
    } else {
      setValidationState({
        uri: 'success',
        token: current.token ? 'success' : '',
        username: current.username ? 'success' : '',
        branch: current.branch ? 'success' : '',
        path: current.path ? 'success' : '',
      });
    }
  };

  useDebounce(
    () => {
      // Can't validate repository without URI or branch name
      if (!current.uri) {
        setValidationState({});
        return;
      }

      // Get information about changes
      const last = validatedRef.current;
      const isUriChanged = current.uri !== last.uri;
      const isTokenChanged = current.token !== last.token;
      const isUsernameChanged = current.username !== last.username;
      const isBranchChanged = current.branch !== last.branch;
      const isPathChanged = current.path !== last.path;
      const validationState: any = {
        uri: isUriChanged ? 'loading' : '',
        token: (isUriChanged && current.token) || isTokenChanged ? 'loading' : '',
        username: (isUriChanged && current.username) || isUsernameChanged ? 'loading' : '',
        branch: (isUriChanged && current.branch) || isBranchChanged ? 'loading' : '',
        path: ((isUriChanged || isBranchChanged) && current.path) || isPathChanged ? 'loading' : '',
      };

      // Update external state
      setValidationState((prevValidationState: any) => ({
        uri: validationState.uri || prevValidationState.uri,
        token: validationState.token || (current.token === '' ? '' : prevValidationState.token),
        username: validationState.username || (current.username === '' ? '' : prevValidationState.username),
        branch: validationState.branch || prevValidationState.branch,
        path: validationState.path || (current.path === '' ? '' : prevValidationState.path),
      }));

      // Trigger new update
      if (fieldsNames.some(field => validationState[field] === 'loading')) {
        validateRepository(getValidationPayload()).then(handleResponse);
      }
    },
    300,
    [current.uri, current.token, current.username, current.branch, current.path]
  );
};

export default useValidateRepository;
