import {useRef} from 'react';
import {useDebounce, useInterval, useLatest, useUpdate} from 'react-use';

import {NamePath} from 'antd/lib/form/interface';

import {BaseQueryFn, FetchBaseQueryError, MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {isEqual} from 'lodash';

import {Repository} from '@models/repository';

import {TooltipStatus} from '@molecules/GitFormItems/tooltipUtils';

import {DynamicFetchArgs} from '@utils/fetchUtils';
import {dummySecret} from '@utils/sources';

import {RTKResponse} from '@src/models/fetch';

export type ValidationState = {
  message: string;
  uri?: TooltipStatus;
  token?: TooltipStatus;
  username?: TooltipStatus;
  branch?: TooltipStatus;
  commit?: TooltipStatus;
  path?: TooltipStatus;
};

const fieldsNames: string[] = ['uri', 'token', 'username', 'branch', 'path'];

const authSearchString = 'username or token:';
const uriSearchString = 'uri:';
const branchSearchString = 'branch:';
const pathSearchString = 'path:';
const endSearchString = ', context';

const getErrorMessage = (rawErrorString: string, searchString: string) => {
  return rawErrorString.slice(
    rawErrorString.indexOf(searchString) + searchString.length,
    rawErrorString.indexOf(endSearchString)
  );
};

const useValidateRepository = (
  getFieldValue: (name: NamePath) => string,
  setValidationState: React.Dispatch<React.SetStateAction<ValidationState>>,
  validateRepository: MutationTrigger<
    MutationDefinition<
      Repository,
      BaseQueryFn<string | DynamicFetchArgs, unknown, FetchBaseQueryError>,
      never,
      void,
      'repositoryApi'
    >
  >
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

  const getValidationPayload = (): Repository => {
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

  const handleResponse = (res: RTKResponse<void>) => {
    if (!isEqual(latestRef.current, current)) {
      return;
    }

    // Save information about the last response
    validatedRef.current = current;

    if (res && 'error' in res && 'data' in res.error) {
      // @ts-ignore
      const errorDetail = res.error.data?.detail;

      if (!errorDetail) {
        setValidationState({
          message: 'Network error',
          uri: TooltipStatus.Error,
        });
        return;
      }

      if (errorDetail.includes(authSearchString)) {
        setValidationState({
          message: getErrorMessage(errorDetail, authSearchString),
          uri: TooltipStatus.Error,
          token: current.token ? TooltipStatus.Error : TooltipStatus.None,
          username: current.username ? TooltipStatus.Error : TooltipStatus.None,
        });
        return;
      }
      if (errorDetail.includes(uriSearchString)) {
        setValidationState({
          message: getErrorMessage(errorDetail, uriSearchString),
          uri: TooltipStatus.Error,
        });
        return;
      }

      if (errorDetail.includes(branchSearchString)) {
        setValidationState({
          message: getErrorMessage(errorDetail, branchSearchString),
          uri: TooltipStatus.Success,
          token: current.token ? TooltipStatus.Success : TooltipStatus.None,
          username: current.username ? TooltipStatus.Success : TooltipStatus.None,
          branch: TooltipStatus.Error,
        });
        return;
      }

      if (errorDetail.includes(pathSearchString)) {
        setValidationState({
          message: getErrorMessage(errorDetail, pathSearchString),
          uri: TooltipStatus.Success,
          token: current.token ? TooltipStatus.Success : TooltipStatus.None,
          username: current.username ? TooltipStatus.Success : TooltipStatus.None,
          branch: current.branch ? TooltipStatus.Success : TooltipStatus.None,
          path: TooltipStatus.Error,
        });
        return;
      }

      setValidationState({
        message: 'Unknown error',
        uri: TooltipStatus.Error,
      });
    } else {
      setValidationState({
        uri: TooltipStatus.Success,
        token: current.token ? TooltipStatus.Success : TooltipStatus.None,
        username: current.username ? TooltipStatus.Success : TooltipStatus.None,
        branch: current.branch ? TooltipStatus.Success : TooltipStatus.None,
        path: current.path ? TooltipStatus.Success : TooltipStatus.None,
        message: TooltipStatus.None,
      });
    }
  };

  useDebounce(
    () => {
      // Can't validate repository without URI or branch name
      if (!current.uri) {
        setValidationState({message: TooltipStatus.None});
        return;
      }

      // Get information about changes
      const last = validatedRef.current;
      const isUriChanged = current.uri !== last.uri;
      const isTokenChanged = current.token !== last.token;
      const isUsernameChanged = current.username !== last.username;
      const isBranchChanged = current.branch !== last.branch;
      const isPathChanged = current.path !== last.path;
      const validationState: Record<string, TooltipStatus> = {
        uri: isUriChanged ? TooltipStatus.Loading : TooltipStatus.None,
        token: (isUriChanged && current.token) || isTokenChanged ? TooltipStatus.Loading : TooltipStatus.None,
        username: (isUriChanged && current.username) || isUsernameChanged ? TooltipStatus.Loading : TooltipStatus.None,
        branch: (isUriChanged && current.branch) || isBranchChanged ? TooltipStatus.Loading : TooltipStatus.None,
        path:
          ((isUriChanged || isBranchChanged) && current.path) || isPathChanged
            ? TooltipStatus.Loading
            : TooltipStatus.None,
      };

      // Update external state
      setValidationState(prevValidationState => ({
        ...prevValidationState,
        uri: validationState.uri || prevValidationState.uri,
        token: validationState.token || (current.token === '' ? '' : prevValidationState.token),
        username: validationState.username || (current.username === '' ? '' : prevValidationState.username),
        branch: validationState.branch || prevValidationState.branch,
        path: validationState.path || (current.path === '' ? '' : prevValidationState.path),
      }));

      // Trigger new update
      if (fieldsNames.some(field => validationState[field] === TooltipStatus.Loading)) {
        validateRepository(getValidationPayload()).then(res => {
          handleResponse(res);
        });
      }
    },
    300,
    [current.uri, current.token, current.username, current.branch, current.path]
  );
};

export default useValidateRepository;
