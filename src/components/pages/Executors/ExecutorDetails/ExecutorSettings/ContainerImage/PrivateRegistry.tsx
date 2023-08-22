import {Form, Input} from 'antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

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

  return (
    <CardForm
      name="general-settings-name-type"
      title="Private registry"
      description="In case your image is on a private registry please add the name of your credential secret."
      form={form}
      initialValues={{privateRegistry}}
      disabled={!mayEdit}
      onConfirm={onSubmit}
    >
      <Form.Item label="Secret ref name" name="privateRegistry" style={{flex: 1, marginBottom: '0'}}>
        <Input placeholder="Secret ref name" />
      </Form.Item>
    </CardForm>
  );
};

export default PrivateRegistry;
