import {useCallback} from 'react';
import {useDebounce} from 'react-use';

import {NamePath} from 'antd/lib/form/interface';

import {dummySecret} from '@utils/sources';

const fieldsNames: string[] = ['uri', 'token', 'username', 'branch', 'path'];

const useValidateRepository = (
  getFieldValue: (name: NamePath) => string,
  setValidationState: React.Dispatch<any>,
  validateRepository: any
) => {
  const handleResponse = useCallback(
    (res: any) => {
      if (res?.error) {
        const errorDetail = res?.error?.data?.detail;
        const fieldsStatus: any = {};

        if (!errorDetail) {
          setValidationState({
            message: 'Network error',
            uri: 'error',
          });
          return;
        }

        if (errorDetail.includes('authentication')) {
          fieldsStatus.uri = 'error';
          fieldsStatus.token = 'error';
          fieldsStatus.username = 'error';
        } else if (errorDetail.includes('git')) {
          fieldsStatus.uri = 'error';
        } else {
          fieldsStatus.uri = 'success';
          fieldsStatus.token = getFieldValue('token') ? 'success' : '';
          fieldsStatus.username = getFieldValue('username') ? 'success' : '';
        }

        if (errorDetail.includes('branch')) {
          fieldsStatus.branch = 'error';
        }

        setValidationState({
          message: errorDetail,
          ...fieldsStatus,
        });
      } else {
        setValidationState({
          uri: 'success',
          token: getFieldValue('token') ? 'success' : '',
          username: getFieldValue('username') ? 'success' : '',
          branch: getFieldValue('branch') ? 'success' : '',
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
      if (!getFieldValue('uri') || (!getFieldValue('branch') && !getFieldValue('commit'))) {
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
};

export default useValidateRepository;
