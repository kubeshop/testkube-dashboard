import {useEffect} from 'react';

import {Form} from 'antd';

import {CommandInput} from '@atoms';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {useExecutorsPick} from '@store/executors';

import {displayDefaultNotificationFlow} from '@utils/notification';

type CommandFormFields = {
  command: string;
};

const Command: React.FC = () => {
  const mayEdit = usePermission(Permissions.editEntity);

  const {current} = useExecutorsPick('current');

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const [form] = Form.useForm<CommandFormFields>();

  const onSubmit = () => {
    const values = form.getFieldsValue();

    return updateCustomExecutor({
      executorId: current!.name,
      body: {
        name: current!.name,
        ...current!.executor,
        command: values.command.split(' '),
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'Command was successfully updated.'));
  };

  useEffect(() => {
    form.setFieldsValue({
      command: current!.executor.command?.join(' '),
    });
  }, [current!.executor.command]);

  return (
    <Form
      form={form}
      name="general-settings-name-type"
      initialValues={{command: current!.executor.command?.join(' ')}}
      layout="vertical"
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Command"
        description="Define the command your image needs to run"
        onConfirm={onSubmit}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <Form.Item label="Command" name="command" style={{flex: 1, marginBottom: '0'}}>
          <CommandInput />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default Command;
