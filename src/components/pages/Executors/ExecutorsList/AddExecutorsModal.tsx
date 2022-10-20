import {useContext} from 'react';

import {Form} from 'antd';

import {Button, Input} from '@custom-antd';

import {Hint} from '@molecules';

import {openCustomExecutorDocumentation} from '@utils/externalLinks';

import {useCreateExecutorMutation} from '@services/executors';

import {MainContext} from '@contexts';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@src/utils/notification';

import {AddExecutorsModalContainer} from './ExecutorsList.styled';

const AddExecutorsModal = () => {
  const {navigate} = useContext(MainContext);
  const [createExecutor, {isLoading}] = useCreateExecutorMutation();

  const onFinish = (values: any) => {
    const body = {
      ...values,
      namespace: 'testkube',
      types: [values.type],
      executorType: 'container',
    };

    delete body.type;

    createExecutor(body)
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          navigate(`/executors/${res.data.metadata.name}`);
        });
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <AddExecutorsModalContainer>
      <Form style={{flex: 1}} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" required name="name">
          <Input placeholder="e.g.: my-container-executor" />
        </Form.Item>
        <Form.Item label="Executor type" required name="type">
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
        >
          <Button htmlType="submit" $customType="primary" loading={isLoading}>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
      <Hint
        title="Need help?"
        description="We’ll guide you to easily create your very specific container based executor."
        openLink={openCustomExecutorDocumentation}
      />
    </AddExecutorsModalContainer>
  );
};

export default AddExecutorsModal;
