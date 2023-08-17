import {useEffect, useState} from 'react';

import {Form} from 'antd';

import {FullWidthSpace} from '@custom-antd';

import {ErrorNotificationConfig} from '@models/notifications';

import {ConfigurationCard, SecretFormItem, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateSourceMutation} from '@services/sources';

import {useSourcesPick} from '@store/sources';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {dummySecret} from '@utils/sources';

type AuthenticationFormValues = {
  token: string;
  username: string;
};

const Authentication: React.FC = () => {
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<AuthenticationFormValues>();

  const {current} = useSourcesPick('current');

  const [updateSource] = useUpdateSourceMutation();

  const repository = current!.repository;
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

  const onFinish = () => {
    const values = form.getFieldsValue();

    if (!current) {
      return new Promise<ErrorNotificationConfig>(() => ({title: 'Something went wrong'}));
    }
    const token = values.token || '';
    const username = values.username || '';
    const body = {
      ...current,
      repository: {
        ...current.repository,
        ...(!tokenSecret || isClearedToken ? {token, tokenSecret: undefined} : {}),
        ...(!usernameSecret || isClearedUsername ? {username, usernameSecret: undefined} : {}),
      },
    };

    return updateSource(body)
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'Source was successfully updated.'));
  };

  return (
    <Form
      form={form}
      initialValues={defaults}
      name="general-settings-authentication"
      layout="vertical"
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Authentication"
        description="Add authentication related information required by your git repository"
        onConfirm={onFinish}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
        forceEnableButtons={Boolean((tokenSecret && isClearedToken) || (usernameSecret && isClearedUsername))}
      >
        <FullWidthSpace size={24} direction="vertical">
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
        </FullWidthSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Authentication;
