import {useEffect, useState} from 'react';

import {Form} from 'antd';

import {Option} from '@models/form';
import {ErrorNotificationConfig} from '@models/notifications';

import {SecretFormItem, notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateSourceMutation} from '@services/sources';

import {useSourcesPick} from '@store/sources';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {formatSecrets, getSecretsFromRepository} from '@utils/sources';

type AuthenticationFormValues = {
  token: Option;
  username: Option;
};

const Authentication: React.FC = () => {
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<AuthenticationFormValues>();

  const {current} = useSourcesPick('current');

  const [updateSource] = useUpdateSourceMutation();

  const repository = current!.repository;
  const [defaults, setDefaults] = useState(getSecretsFromRepository(repository));

  useEffect(() => {
    setDefaults(getSecretsFromRepository(repository));
  }, [repository]);

  const onCancel = () => {
    form.resetFields();
  };

  const onFinish = () => {
    const values = form.getFieldsValue();

    if (!current) {
      return new Promise<ErrorNotificationConfig>(() => ({title: 'Something went wrong'}));
    }
    const token = values.token;
    const username = values.username;
    const body = {
      ...current,
      repository: {
        ...current.repository,
        ...formatSecrets(token, username),
      },
    };

    return updateSource(body)
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'Source was successfully updated.'));
  };

  return (
    <CardForm
      name="general-settings-authentication"
      title="Authentication"
      description="Add authentication related information required by your git repository"
      spacing={24}
      form={form}
      initialValues={defaults}
      disabled={!mayEdit}
      onConfirm={onFinish}
      onCancel={onCancel}
    >
      <SecretFormItem name="username" label="Git username" />
      <SecretFormItem name="token" label="Git token" />
    </CardForm>
  );
};

export default Authentication;
