import {useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {Executor} from '@models/executors';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateExecutorCommand} from '@redux/reducers/executorsSlice';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultErrorNotification} from '@utils/notification';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {MainContext} from '@contexts';

type CommandFormFields = {
  command: string;
};

const Command: React.FC = () => {
  const {executor, name} = useAppSelector(selectCurrentExecutor) as Executor;
  const {command} = executor;

  const {dispatch} = useContext(MainContext);

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const [form] = Form.useForm<CommandFormFields>();

  const onSubmit = (values: CommandFormFields) => {
    updateCustomExecutor({
      executorId: name,
      body: {
        name,
        ...executor,
        command: values.command.split(' '),
      },
    })
      .then(() => {
        notificationCall('passed', 'Command was successfully updated.');
        dispatch(updateExecutorCommand(values.command));
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
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
      onFinish={onSubmit}
    >
      <ConfigurationCard
        title="Command"
        description="Define the command your image needs to run"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
      >
        <Form.Item label="Command" name="command">
          <Input placeholder="Command" />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default Command;
