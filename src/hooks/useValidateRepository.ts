import {useDebounce} from 'react-use';

import {NamePath} from 'antd/lib/form/interface';

const fieldsNames: string[] = ['uri', 'token', 'username', 'branch', 'commit'];

const useValidateRepository = (
  getFieldValue: (name: NamePath) => string,
  setValidationState: any,
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
      }).then((res: any) => {
        if (res?.error) {
          const errorDetail = res?.error?.data?.detail;
          const fieldsStatus: any = {};

          if (errorDetail.includes('authentication')) {
            fieldsStatus.uri = 'error';
            fieldsStatus.token = 'error';
            fieldsStatus.username = 'error';
          } else if (errorDetail.includes('git')) {
            fieldsStatus.uri = 'error';
          } else {
            fieldsStatus.uri = 'success';
            fieldsStatus.token = 'success';
            fieldsStatus.username = 'success';
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
          branch: 'none',
          commit: 'none',
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

          if (errorDetail.includes('branch')) {
            fieldsStatus.branch = 'error';
          }

          if (errorDetail.includes('commit')) {
            fieldsStatus.commit = 'error';
          }

          setValidationState((validationState: any) => ({
            ...validationState,
            message: errorDetail,
            ...fieldsStatus,
          }));
        } else {
          setValidationState((validationState: any) => ({
            ...validationState,
            branch: 'success',
            commit: 'success',
          }));
        }
      });
    },
    300,
    [getFieldValue('branch'), getFieldValue('commit')]
  );
};

export default useValidateRepository;
