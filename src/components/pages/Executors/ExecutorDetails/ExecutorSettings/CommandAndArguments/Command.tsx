import {Form} from 'antd';

import {CommandInput} from '@atoms';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

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

  return (
    <CardForm
      name="general-settings-name-type"
      title="Command"
      description="Define the command your image needs to run"
      form={form}
      initialValues={{command: current!.executor.command?.join(' ')}}
      disabled={!mayEdit}
      onConfirm={onSubmit}
    >
      <Form.Item label="Command" name="command" style={{flex: 1, marginBottom: '0'}}>
        <CommandInput />
      </Form.Item>
    </CardForm>
  );
};

export default Command;
