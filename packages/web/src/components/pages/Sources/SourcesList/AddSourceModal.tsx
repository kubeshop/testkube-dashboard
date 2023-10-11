import React, {useRef, useState} from 'react';

import {Form} from 'antd';

import {Button, Input} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useInViewport from '@hooks/useInViewport';

import {useModal} from '@modal/hooks';

import {Option} from '@models/form';
import {ErrorNotificationConfig} from '@models/notifications';
import {SourceWithRepository} from '@models/sources';

import {Hint, NotificationContent, SecretSelect} from '@molecules';

import {useCreateSourceMutation} from '@services/sources';

import {useClusterDetailsPick} from '@store/clusterDetails';

import {externalLinks} from '@utils/externalLinks';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {formatSecrets} from '@utils/sources';

import {AddSourceModalContainer} from './SourcesList.styled';

type AddSourceFormValues = {
  name: string;
  uri: string;
  token?: Option;
  username?: Option;
};

const AddSourceModal: React.FC = () => {
  const {namespace} = useClusterDetailsPick('namespace');
  const [form] = Form.useForm<AddSourceFormValues>();
  const openDetails = useDashboardNavigate((name: string) => `/sources/${name}`);
  const {close} = useModal();

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
        ...formatSecrets(token, username),
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
      })
      .finally(() => {
        close();
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
          <Input placeholder="e.g.: my-git-test-repository" autoComplete="off" />
        </Form.Item>
        <Form.Item label="Git repository URL" required name="uri" rules={[required]}>
          <Input placeholder="e.g.: https://github.com/myCompany/myRepo.git" />
        </Form.Item>
        <Form.Item label="Git username" name="username">
          <SecretSelect />
        </Form.Item>
        <Form.Item label="Git token" name="token">
          <SecretSelect />
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
