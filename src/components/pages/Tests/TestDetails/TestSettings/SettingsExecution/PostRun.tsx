import {Form} from 'antd';

import {CommandInput} from '@atoms';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

type PostRunFormValues = {
  command: string;
};

const PostRun: React.FC = () => {
  const {details} = useEntityDetailsPick('details');
  const isPostRunAvailable = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<PostRunFormValues>();

  const [updateTest] = useUpdateTestMutation();

  if (!details) {
    return null;
  }

  const command = details?.executionRequest?.postRunScript;

  const onSave = () => {
    const values = form.getFieldsValue();

    return updateTest({
      id: details.name,
      data: {
        ...details,
        executionRequest: {
          ...details.executionRequest,
          postRunScript: values.command,
        },
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', `Post-Run command was successfully updated.`));
  };

  return (
    <Form
      form={form}
      name="execution-settings-post-run"
      initialValues={{command}}
      disabled={!isPostRunAvailable}
      layout="vertical"
    >
      <ConfigurationCard
        title="Post-Run phase"
        description="You can run a command or a script (relative to your source root) which will be executed after the test itself has ended."
        onConfirm={onSave}
        onCancel={() => {
          form.resetFields();
        }}
      >
        <FullWidthSpace size={32} direction="vertical">
          <FormItem name="command" label="Command">
            <CommandInput />
          </FormItem>
        </FullWidthSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default PostRun;
