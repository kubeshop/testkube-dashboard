import {useContext, useEffect, useState} from 'react';

import {Form} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {ConfigurationCard, notificationCall, SecretFormItem} from '@molecules';

import {dummySecret} from '@utils/sources';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateSourceMutation} from '@services/sources';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

import {StyledSpace} from '../../SourceDetails.styled';

type AuthenticationFormValues = {
  token: string;
  username: string;
};

const Authentication: React.FC = () => {
  const {dispatch} = useContext(MainContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<AuthenticationFormValues>();

  const source = useAppSelector(selectCurrentSource);

  const [updateSource] = useUpdateSourceMutation();

  const repository = source?.repository;
  const {tokenSecret, usernameSecret} = repository || {};
  const defaults = {
    token: tokenSecret ? dummySecret : '',
    username: usernameSecret ? dummySecret : '',
  };

  const [isClearedToken, setIsClearedToken] = useState(!tokenSecret);
  const [isClearedUsername, setIsClearedUsername] = useState(!usernameSecret);

  useEffect(() => {
    form.setFieldsValue(defaults);
    form.resetFields();
    setIsClearedToken(!tokenSecret);
    setIsClearedUsername(!usernameSecret);
  }, [repository]);

  const onFinish = (values: AuthenticationFormValues) => {
    if (!source) {
      notificationCall('failed', 'Something went wrong.');
    } else {
      const token = values.token || '';
      const username = values.username || '';
      const body = {
        ...source,
        repository: {
          ...source.repository,
          ...(!tokenSecret || isClearedToken ? {token, tokenSecret: undefined} : {}),
          ...(!usernameSecret || isClearedUsername ? {username, usernameSecret: undefined} : {}),
        },
      };

      // @ts-ignore:
      updateSource(body).then(res => {
        displayDefaultNotificationFlow(res, () => {
          if ('data' in res) {
            notificationCall('passed', 'Source was successfully updated.');
            dispatch(setCurrentSource({...body, ...res.data.spec}));
          }
        });
      });
    }
  };

  return (
    <Form
      form={form}
      initialValues={defaults}
      name="general-settings-authentication"
      layout="vertical"
      onFinish={onFinish}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Authentication"
        description="Add authentication related information required by your git repository"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
        forceEnableButtons={Boolean((tokenSecret && isClearedToken) || (usernameSecret && isClearedUsername))}
      >
        <StyledSpace size={24} direction="vertical">
          <SecretFormItem
            name="username"
            label="Git username"
            isClearedValue={isClearedUsername}
            setIsClearedValue={setIsClearedUsername}
          />
          <SecretFormItem
            name="token"
            label="Git token"
            isClearedValue={isClearedToken}
            setIsClearedValue={setIsClearedToken}
          />
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Authentication;
