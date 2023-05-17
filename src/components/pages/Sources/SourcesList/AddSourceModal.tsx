import React, {useContext, useState} from 'react';

import {Input as AntdInput, Form} from 'antd';

import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';

import {SourceWithRepository} from '@models/sources';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';

import {Button, Input} from '@custom-antd';

import {Hint, NotificationContent} from '@molecules';

import {externalLinks} from '@utils/externalLinks';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {defaultNotificationFlow} from '@utils/notification';

import {useCreateSourceMutation} from '@services/sources';

import {DashboardContext} from '@contexts';

import {ErrorNotificationConfig} from '@src/models/notifications';

import {AddSourceModalContainer} from './SourcesList.styled';

type AddSourceFormValues = {
  name: string;
  uri: string;
  token?: string;
  username?: string;
};

const AddSourceModal: React.FC = () => {
  const [form] = Form.useForm<AddSourceFormValues>();
  const {navigate} = useContext(DashboardContext);

  const [createSource, {isLoading}] = useCreateSourceMutation();

  const namespace = useAppSelector(selectNamespace);

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);

  const onFinish = (values: AddSourceFormValues) => {
    const {name, uri, token, username} = values;

    const body: SourceWithRepository = {
      name,
      repository: {
        type: 'git',
        uri,
        username: username || undefined,
        token: token || undefined,
      },
      namespace,
    };

    createSource(body).then(res => {
      defaultNotificationFlow(
        res,
        () => {
          if ('data' in res) {
            navigate(`/sources/${res.data.metadata.name}`);
          }
        },
        err => {
          setError(err);
        }
      );
    });
  };

  return (
    <AddSourceModalContainer>
      <Form style={{flex: 1}} layout="vertical" onFinish={onFinish} form={form} name="add-source-form">
        {error ? (
          <div style={{marginBottom: '20px'}}>
            <NotificationContent status="failed" message={error.message} title={error.title} />
          </div>
        ) : null}
        <Form.Item
          label="Name"
          required
          name="name"
          rules={[required, k8sResourceNameMaxLength, k8sResourceNamePattern]}
        >
          <Input placeholder="e.g.: my-git-test-repository" />
        </Form.Item>
        <Form.Item label="Git repository URL" required name="uri" rules={[required]}>
          <Input placeholder="e.g.: https://github.com/myCompany/myRepo.git" />
        </Form.Item>
        <Form.Item label="Git username" name="username">
          <Input placeholder="e.g.: my-user-name" />
        </Form.Item>
        <Form.Item label="Git token" name="token">
          <AntdInput.Password
            placeholder="e.g.: some-token"
            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item
          style={{
            textAlign: 'end',
            marginBottom: 0,
          }}
          shouldUpdate
        >
          {({isFieldsTouched}) => (
            <Button htmlType="submit" $customType="primary" loading={isLoading} disabled={!isFieldsTouched()}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Hint
        title="Need help?"
        description="We’ll guide you to easily create your very specific test source."
        openLink={() => window.open(externalLinks.sourcesApi)}
      />
    </AddSourceModalContainer>
  );
};

export default AddSourceModal;
