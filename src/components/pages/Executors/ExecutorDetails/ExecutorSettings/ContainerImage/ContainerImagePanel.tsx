import {Form, Input} from 'antd';

import {Executor} from '@models/executors';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {useExecutorsPick} from '@store/executors';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

export type ContainerImageFormFields = {
  image: Executor['executor']['image'];
};

const ContainerImagePanel: React.FC = () => {
  const {current} = useExecutorsPick('current');
  const image = current!.executor.image;

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const [form] = Form.useForm<ContainerImageFormFields>();

  const onSubmit = () => {
    const values = form.getFieldsValue();

    return updateCustomExecutor({
      executorId: current!.name,
      body: {
        name: current!.name,
        ...current!.executor,
        ...values,
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'Container image was successfully updated.'));
  };

  return (
    <CardForm
      name="general-settings-name-type"
      title="Container image"
      description="Define the image you want to use for this executor. We defer by default to Dockerhub - but you can also insert a URL to your very own image"
      form={form}
      initialValues={{image}}
      disabled={!mayEdit}
      onConfirm={onSubmit}
    >
      <Form.Item label="Container image" required name="image" rules={[required]} style={{flex: 1, marginBottom: '0'}}>
        <Input placeholder="Container image" />
      </Form.Item>
    </CardForm>
  );
};

export default ContainerImagePanel;
