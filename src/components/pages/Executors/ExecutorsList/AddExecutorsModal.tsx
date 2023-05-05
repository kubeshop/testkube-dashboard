import {useContext} from 'react';

import {Form} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';

import {Button, Input} from '@custom-antd';

import {Hint} from '@molecules';

import {openCustomExecutorDocumentation} from '@utils/externalLinks';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {useCreateExecutorMutation} from '@services/executors';

import {DashboardContext} from '@contexts';

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

  const onFinish = (values: AddExecutorsFormValues) => {
    const body = {
      ...values,
      namespace,
      types: [values.type],
      executorType: 'container',
    };

    delete body.type;

    createExecutor(body).then(res => {
      displayDefaultNotificationFlow(res, () => {
        if ('data' in res) {
          navigate(`/executors/${res.data.metadata.name}`);
        }
      });
    });
  };

  return (
    <AddExecutorsModalContainer>
      <Form style={{flex: 1}} layout="vertical" onFinish={onFinish} form={form}>
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
        openLink={openCustomExecutorDocumentation}
      />
    </AddExecutorsModalContainer>
  );
};

export default AddExecutorsModal;
