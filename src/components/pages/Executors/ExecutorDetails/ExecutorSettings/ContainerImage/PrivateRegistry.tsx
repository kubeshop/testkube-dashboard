import {useEffect} from 'react';

import {Form, Input} from 'antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {useExecutorsPick} from '@store/executors';

import {displayDefaultNotificationFlow} from '@utils/notification';

export type PrivateRegistryFormFields = {
  privateRegistry: string;
};

const PrivateRegistry: React.FC = () => {
  const {current} = useExecutorsPick('current');
  const imagePullSecrets = current!.executor.imagePullSecrets;

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const privateRegistry = (imagePullSecrets && imagePullSecrets.length && imagePullSecrets[0].name) || '';

  const [form] = Form.useForm<PrivateRegistryFormFields>();

  const onSubmit = () => {
    const values = form.getFieldsValue();
    const newImagePullSecrets = values.privateRegistry ? [{name: values.privateRegistry}] : [];

    return updateCustomExecutor({
      executorId: current!.name,
      body: {
        name: current!.name,
        ...current!.executor,
        imagePullSecrets: newImagePullSecrets,
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'Private registry was successfully updated.'));
  };

  useEffect(() => {
    form.setFieldsValue({privateRegistry});
  }, [privateRegistry]);

  return (
    <Form
      form={form}
      name="general-settings-name-type"
      initialValues={{privateRegistry}}
      layout="vertical"
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Private registry"
        description="In case your image is on a private registry please add the name of your credential secret."
        onConfirm={onSubmit}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <Form.Item label="Secret ref name" name="privateRegistry" style={{flex: 1, marginBottom: '0'}}>
          <Input placeholder="Secret ref name" />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default PrivateRegistry;
