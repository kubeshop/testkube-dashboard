import {FC, useRef, useState} from 'react';

import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';
import {Input as AntdInput, Form} from 'antd';

import {Button} from '@custom-antd/Button';
import {Input} from '@custom-antd/Input';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useInViewport} from '@hooks/useInViewport';

import type {ErrorNotificationConfig} from '@models/notifications';
import type {SourceWithRepository} from '@models/sources';

import {Hint} from '@molecules/Hint';
import {NotificationContent} from '@molecules/Notification/NotificationContent';

import {AddSourceModalContainer} from '@pages/Sources/SourcesList.styled';

import {useCreateSourceMutation} from '@services/sources';

import {useClusterDetailsPick} from '@store/clusterDetails';

import {externalLinks} from '@utils/externalLinks';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

type AddSourceFormValues = {
  name: string;
  uri: string;
  token?: string;
  username?: string;
};

export const AddSourceModal: FC = () => {
  const {namespace} = useClusterDetailsPick('namespace');
  const [form] = Form.useForm<AddSourceFormValues>();
  const openDetails = useDashboardNavigate((name: string) => `/sources/${name}`);

  const [createSource, {isLoading}] = useCreateSourceMutation();

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

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

    createSource(body)
      .then(displayDefaultNotificationFlow)
      .then(res => openDetails(res.data.metadata.name))
      .catch(err => {
        setError(err);

        if (!inTopInViewport && topRef && topRef.current) {
          topRef.current.scrollIntoView();
        }
      });
  };

  return (
    <AddSourceModalContainer>
      <div ref={topRef} />
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
