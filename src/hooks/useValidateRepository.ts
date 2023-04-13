import {useDebounce} from 'react-use';

import {NamePath} from 'antd/lib/form/interface';

const fieldsNames: string[] = ['uri', 'token', 'username', 'branch', 'commit', 'path'];

const useValidateRepository = (
  getFieldValue: (name: NamePath) => string,
  setValidationState: React.Dispatch<any>,
  validateRepository: any
) => {
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

      validateRepository({
        type: 'git',
        ...fieldsNames.reduce((acc, curr) => Object.assign(acc, {[curr]: getFieldValue(curr)}), {}),
        tokenSecret: {
          key: 'git-token',
          name: 'k6-demo-test-secrets',
          namespace: 'testkube',
        },
        usernameSecret: {
          key: 'git-username',
          name: 'k6-demo-test-secrets',
          namespace: 'testkube',
        },
      }).then((res: any) => {
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
          if (errorDetail.includes('commit')) {
            fieldsStatus.commit = 'error';
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
            commit: getFieldValue('commit') ? 'success' : '',
          });
        }
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
          commit: '',
        }));
        return;
      }

      setValidationState((validationState: any) => ({
        ...validationState,
        message: '',
        branch: 'loading',
        commit: 'loading',
      }));

      validateRepository({
        type: 'git',
        ...fieldsNames.reduce((acc, curr) => Object.assign(acc, {[curr]: getFieldValue(curr)}), {}),
      }).then((res: any) => {
        if (res?.error) {
          const errorDetail = res?.error?.data?.detail;
          const fieldsStatus: any = {};

          if (errorDetail.includes('authentication') || errorDetail.includes('git')) {
            setValidationState((validationState: any) => ({
              ...validationState,
              message: errorDetail,
              branch: '',
              commit: '',
            }));
            return;
          }

          if (!errorDetail) {
            setValidationState({
              message: 'Network error',
              uri: 'error',
            });
            return;
          }
          if (errorDetail.includes('commit')) {
            fieldsStatus.commit = 'error';
          } else {
            fieldsStatus.commit = 'success';
          }

          if (errorDetail.includes('branch')) {
            fieldsStatus.branch = 'error';
          } else {
            fieldsStatus.branch = 'success';
          }

          setValidationState((validationState: any) => ({
            ...validationState,
            message: errorDetail,
            ...fieldsStatus,
          }));
        } else {
          setValidationState((validationState: any) => ({
            ...validationState,
            branch: getFieldValue('branch') ? 'success' : '',
            commit: getFieldValue('commit') ? 'success' : '',
          }));
        }
      });
    },
    300,
    [getFieldValue('branch'), getFieldValue('commit')]
  );
};

export default useValidateRepository;
