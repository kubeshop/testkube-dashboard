import {useRef, useState} from 'react';

import {Form} from 'antd';

import {ControlledForm} from '@atoms/ControlledForm/ControlledForm';

import {Button, Input} from '@custom-antd';

import {CreateExecutorDto} from '@dto/CreateExecutor';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useInViewport from '@hooks/useInViewport';

import {ErrorNotificationConfig} from '@models/notifications';

import {Hint, NotificationContent} from '@molecules';

import {useCreateExecutorMutation} from '@services/executors';

import {useClusterDetailsPick} from '@store/clusterDetails';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {AddExecutorsModalContainer} from './ExecutorsList.styled';

const AddExecutorsModal: React.FC = () => {
  const {namespace} = useClusterDetailsPick('namespace');
  const openDetails = useDashboardNavigate((name: string) => `/executors/${name}`);

  const [createExecutor, {isLoading}] = useCreateExecutorMutation();

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  const [value, setValue] = useState(new CreateExecutorDto());
  const onFinish = (values: CreateExecutorDto) => {
    const body: any = {
      ...values,
      namespace,
      types: [values.type],
      executorType: 'container',
    };

    delete body.type;

    return createExecutor(body)
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
    <AddExecutorsModalContainer>
      <div ref={topRef} />
      <ControlledForm
        value={value}
        Validator={CreateExecutorDto}
        style={{flex: 1}}
        onSubmit={onFinish}
        onChange={setValue}
        layout="vertical"
      >
        {error ? (
          <div style={{marginBottom: '20px'}}>
            <NotificationContent status="failed" message={error.message} title={error.title} />
          </div>
        ) : null}
        <Form.Item label="Name" required name="name">
          <Input placeholder="e.g.: my-container-executor" />
        </Form.Item>
        <Form.Item label="Executor type" required name="type" hasFeedback>
          <Input placeholder="e.g.: my-executor/type" />
        </Form.Item>
        <Form.Item label="Container image" required name="image">
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
      </ControlledForm>
      <Hint
        title="Need help?"
        description="We’ll guide you to easily create your very specific container based executor."
        openLink={() => window.open(externalLinks.containerExecutor)}
      />
    </AddExecutorsModalContainer>
  );
};

export default AddExecutorsModal;
