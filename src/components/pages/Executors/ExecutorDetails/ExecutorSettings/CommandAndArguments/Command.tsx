import {useContext, useEffect} from 'react';

import {Form} from 'antd';

import {Executor} from '@models/executors';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateCurrentExecutorData} from '@redux/reducers/executorsSlice';

import {CommandInput} from '@atoms';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

type CommandFormFields = {
  command: string;
};

const Command: React.FC = () => {
  const {dispatch} = useContext(MainContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const {executor, name} = useAppSelector(selectCurrentExecutor) as Executor;
  const {command} = executor;

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const [form] = Form.useForm<CommandFormFields>();

  const onSubmit = () => {
    const values = form.getFieldsValue();

    return updateCustomExecutor({
      executorId: name,
      body: {
        name,
        ...executor,
        command: values.command.split(' '),
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', 'Command was successfully updated.');
        dispatch(updateCurrentExecutorData({command: values.command!.split(' ')}));
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      command: command?.join(' '),
    });
  }, [command]);

  return (
    <Form
      form={form}
      name="general-settings-name-type"
      initialValues={{command: command?.join(' ')}}
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
