import {FormInstance} from 'antd';

import useDebounce from '@hooks/useDebounce';

const useValidateRepository = (form: FormInstance, setUriState: any, validateRepository: any) => {
  useDebounce(
    () => {
      if (form.getFieldValue('uri')) {
        setUriState({
          status: 'loading',
          message: 'Validating repository',
        });

        validateRepository({
          type: 'git',
          uri: form.getFieldValue('uri'),
          token: form.getFieldValue('token'),
          username: form.getFieldValue('username'),
        })
          .then((res: any) => {
            if (res?.error) {
              setUriState({
                status: 'error',
                message: res?.error?.data?.detail || 'Invalid repository',
              });
            } else {
              setUriState({
                status: 'success',
                message: 'Repository is accessible',
              });
            }
          })
          .catch((err: any) => {
            setUriState({
              status: 'error',
              message: err?.error?.data?.detail || 'Invalid repository',
            });
          });
      }
    },
    300,
    [form.getFieldValue('uri'), form.getFieldValue('token'), form.getFieldValue('username')]
  );
};

export default useValidateRepository;
