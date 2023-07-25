import {Form} from 'antd';

import {Input} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTriggerByIdMutation} from '@services/triggers';

import {useTriggersField} from '@store/triggers';

import {displayDefaultNotificationFlow} from '@utils/notification';

const Name: React.FC = () => {
  const [currentTrigger, setCurrentTrigger] = useTriggersField('current');

  const mayEdit = usePermission(Permissions.editEntity);

  const [updateTrigger] = useUpdateTriggerByIdMutation();

  const [form] = Form.useForm();

  const name = currentTrigger?.name;

  const onFinish = () => {
    const values = form.getFieldsValue();

    const body = {
      ...currentTrigger!,
      name: values.name,
    };

    return updateTrigger(body)
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', 'Trigger was successfully updated.');
        setCurrentTrigger(body);
      });
  };

  return (
    <Form form={form} name="general-settings-name" initialValues={{name}} layout="vertical" disabled={!mayEdit}>
      <ConfigurationCard
        title="Trigger name"
        description="Define the name of your trigger"
        onConfirm={onFinish}
        onCancel={() => {
          form.resetFields();
        }}
        isButtonsDisabled
        enabled={false}
        isEditable={false}
      >
        <Form.Item label="Name" name="name">
          <Input placeholder="e.g.: my-test-trigger" disabled />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default Name;
