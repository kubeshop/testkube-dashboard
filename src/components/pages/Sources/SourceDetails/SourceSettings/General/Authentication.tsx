import {useContext, useEffect, useState} from 'react';

import {Form} from 'antd';

import {ErrorNotificationConfig} from '@models/notifications';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {FullWidthSpace} from '@custom-antd';

import {ConfigurationCard, SecretFormItem, notificationCall} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {dummySecret} from '@utils/sources';

import {useUpdateSourceMutation} from '@services/sources';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

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

  const onFinish = () => {
    const values = form.getFieldsValue();

    if (!source) {
      return new Promise<ErrorNotificationConfig>(() => ({title: 'Something went wrong'}));
    }
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

    return updateSource(body).then(res => {
      return displayDefaultNotificationFlow(res, () => {
        if ('data' in res) {
          notificationCall('passed', 'Source was successfully updated.');
          dispatch(setCurrentSource({...body, ...res.data.spec}));
        }
      });
    });
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
