import {useContext} from 'react';

import {Input as AntdInput, Form} from 'antd';

import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {Input} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

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

  const source = useAppSelector(selectCurrentSource);

  const [updateSource] = useUpdateSourceMutation();

  const repository = source?.repository;
  const token = repository?.tokenSecret?.name || '';
  const username = repository?.usernameSecret?.name || '';

  const [form] = Form.useForm<AuthenticationFormValues>();

  const onFinish = (values: AuthenticationFormValues) => {
    if (!source) {
      notificationCall('failed', 'Something went wrong.');
    } else {
      const {token: newToken, username: newUsername} = values;

      const body = {
        ...source,
        repository: {
          ...source.repository,
          ...(newUsername ? {usernameSecret: {name: newUsername}} : {}),
          ...(newToken ? {tokenSecret: {name: newToken}} : {}),
        },
      };

      updateSource(body)
        .then(res => {
          displayDefaultNotificationFlow(res, () => {
            notificationCall('passed', 'Source was successfully updated.');
            dispatch(setCurrentSource(body));
          });
        })
        .catch(err => {
          displayDefaultErrorNotification(err);
        });
    }
  };

  return (
    <Form
      form={form}
      name="general-settings-authentication"
      initialValues={{username, token}}
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
      >
        <Form.Item label="Git username" name="username">
          <Input placeholder="e.g.: my-username" />
        </Form.Item>
        <Form.Item label="Git token" name="token" style={{flex: 1, marginBottom: 0}}>
          <AntdInput.Password
            placeholder="e.g.: some-token"
            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default Authentication;
