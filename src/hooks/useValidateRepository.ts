import {useCallback} from 'react';
import {useDebounce} from 'react-use';

import {NamePath} from 'antd/lib/form/interface';

import {dummySecret} from '@utils/sources';

const fieldsNames: string[] = ['uri', 'token', 'username', 'branch', 'path'];

const authSearchString = 'username or token:';
const uriSearchString = 'uri:';
const branchSearchString = 'branch:';
const pathSearchString = 'path:';
const endSearchString = ', context';

const getErrorMessage = (rawErrorString: string, searchString: string) =>
  rawErrorString.slice(
    rawErrorString.search(searchString) + searchString.length,
    rawErrorString.search(endSearchString)
  );

const useValidateRepository = (
  getFieldValue: (name: NamePath) => string,
  setValidationState: React.Dispatch<any>,
  validateRepository: any
) => {
  const handleResponse = useCallback(
    (res: any) => {
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
            token: getFieldValue('token') ? 'error' : '',
            username: getFieldValue('username') ? 'error' : '',
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
            token: getFieldValue('token') ? 'success' : '',
            username: getFieldValue('username') ? 'success' : '',
            branch: 'error',
          });
          return;
        }

        if (errorDetail.includes(pathSearchString)) {
          setValidationState({
            message: getErrorMessage(errorDetail, pathSearchString),
            uri: 'success',
            token: getFieldValue('token') ? 'success' : '',
            username: getFieldValue('username') ? 'success' : '',
            branch: getFieldValue('branch') ? 'success' : '',
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
          token: getFieldValue('token') ? 'success' : '',
          username: getFieldValue('username') ? 'success' : '',
          branch: getFieldValue('branch') ? 'success' : '',
          path: getFieldValue('path') ? 'success' : '',
        });
      }
    },
    [setValidationState, getFieldValue]
  );

  const getValidationPayload = useCallback(() => {
    return {
      type: 'git',
      ...fieldsNames.reduce((acc, curr) => {
        if (curr === 'token' && getFieldValue(curr) === dummySecret && getFieldValue('tokenSecret')) {
          return {
            ...acc,
            tokenSecret: getFieldValue('tokenSecret'),
          };
        }

        if (curr === 'username' && getFieldValue(curr) === dummySecret && getFieldValue('usernameSecret')) {
          return {
            ...acc,
            usernameSecret: getFieldValue('usernameSecret'),
          };
        }
        return {...acc, [curr]: getFieldValue(curr)};
      }, {}),
    };
  }, [getFieldValue]);

  useDebounce(
    () => {
      if (!getFieldValue('uri')) {
        return;
      }

      setValidationState({
        uri: 'loading',
        token: getFieldValue('token') ? 'loading' : '',
        username: getFieldValue('username') ? 'loading' : '',
      });

      validateRepository(getValidationPayload()).then((res: any) => {
        handleResponse(res);
      });
    },
    300,
    [getFieldValue('uri'), getFieldValue('token'), getFieldValue('username')]
  );

  useDebounce(
    () => {
      if (!getFieldValue('uri') || !getFieldValue('branch')) {
        setValidationState((validationState: any) => ({
          ...validationState,
          branch: '',
        }));
        return;
      }

      setValidationState((validationState: any) => ({
        ...validationState,
        message: '',
        branch: 'loading',
      }));

      validateRepository(getValidationPayload()).then((res: any) => {
        handleResponse(res);
      });
    },
    300,
    [getFieldValue('branch')]
  );

  useDebounce(
    () => {
      if (!getFieldValue('uri') || !getFieldValue('path')) {
        setValidationState((validationState: any) => ({
          ...validationState,
          path: '',
        }));
        return;
      }

      setValidationState((validationState: any) => ({
        ...validationState,
        message: '',
        path: 'loading',
      }));

      validateRepository(getValidationPayload()).then((res: any) => {
        handleResponse(res);
      });
    },
    300,
    [getFieldValue('path')]
  );
};

export default useValidateRepository;
