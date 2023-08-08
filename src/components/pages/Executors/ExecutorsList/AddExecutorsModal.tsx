import {useContext, useRef, useState} from 'react';

import {Form} from 'antd';

import {DashboardContext} from '@contexts';

import {Button, Input} from '@custom-antd';

import useInViewport from '@hooks/useInViewport';

import {ErrorNotificationConfig} from '@models/notifications';

import {Hint, NotificationContent} from '@molecules';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';

import {useCreateExecutorMutation} from '@services/executors';

import {externalLinks} from '@utils/externalLinks';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {AddExecutorsModalContainer} from './ExecutorsList.styled';

type AddExecutorsFormValues = {
  name: string;
  type?: string;
  image: string;
};

const AddExecutorsModal: React.FC = () => {
  const {navigate} = useContext(DashboardContext);

  const [form] = Form.useForm<AddExecutorsFormValues>();

  const [createExecutor, {isLoading}] = useCreateExecutorMutation();

  const namespace = useAppSelector(selectNamespace);

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  const onFinish = (values: AddExecutorsFormValues) => {
    const body = {
      ...values,
      namespace,
      types: [values.type],
      executorType: 'container',
    };

    delete body.type;

    createExecutor(body)
      .then(displayDefaultNotificationFlow)
      .then(res => navigate(`/executors/${res.data.metadata.name}`))
      .catch(err => {
        setError(err);

        if (!inTopInViewport && topRef && topRef.current) {
          topRef.current.scrollIntoView();
        }
      });
  };

  return (
    <AddExecutorsModalContainer>
      <div ref={topRef} />
      <Form style={{flex: 1}} layout="vertical" onFinish={onFinish} form={form}>
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
          <Input placeholder="e.g.: my-container-executor" />
        </Form.Item>
        <Form.Item label="Executor type" required name="type" rules={[required]}>
          <Input placeholder="e.g.: my-executor/type" />
        </Form.Item>
        <Form.Item label="Container image" required name="image" rules={[required]}>
          <Input placeholder="e.g.: curlimages/curl:7.85.0 " />
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
        description="We’ll guide you to easily create your very specific container based executor."
        openLink={() => window.open(externalLinks.containerExecutor)}
      />
    </AddExecutorsModalContainer>
  );
};

export default AddExecutorsModal;
