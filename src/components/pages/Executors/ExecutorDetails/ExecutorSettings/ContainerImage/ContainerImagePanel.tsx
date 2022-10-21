import {useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {Executor} from '@models/executors';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateExecutorContainerImage} from '@redux/reducers/executorsSlice';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultErrorNotification} from '@utils/notification';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {MainContext} from '@contexts';

export type ContainerImageFormFields = {
  image: Executor['executor']['image'];
};

const ContainerImagePanel: React.FC = () => {
  const {executor, name} = useAppSelector(selectCurrentExecutor) as Executor;
  const {image} = executor;

  const {dispatch} = useContext(MainContext);

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const [form] = Form.useForm<ContainerImageFormFields>();

  const onSubmit = (values: ContainerImageFormFields) => {
    updateCustomExecutor({
      executorId: name,
      body: {
        name,
        ...executor,
        ...values,
      },
    })
      .then(() => {
        notificationCall('passed', 'Container image was successfully updated.');
        dispatch(updateExecutorContainerImage(values.image));
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      image,
    });
  }, [image]);

  return (
    <Form form={form} name="general-settings-name-type" initialValues={{image}} layout="vertical" onFinish={onSubmit}>
      <ConfigurationCard
        title="Container image"
        description="Define the image you want to use for this executor. We defer by default to Dockerhub – but you can also insert a URL to your very own image"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
      >
        <Form.Item label="Container image" required name="image" rules={[required]}>
          <Input placeholder="Container image" />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default ContainerImagePanel;
