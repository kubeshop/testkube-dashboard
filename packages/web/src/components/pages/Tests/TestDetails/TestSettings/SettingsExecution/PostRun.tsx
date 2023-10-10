import {Form} from 'antd';

import {CommandInput} from '@atoms';

import {FormItem} from '@custom-antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

type PostRunFormValues = {
  command: string;
};

interface PostRunProps {
  readOnly?: boolean;
}

const PostRun: React.FC<PostRunProps> = ({readOnly}) => {
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
    <CardForm
      name="execution-settings-post-run"
      title="Post-Run phase"
      description="You can run a command or a script (relative to your source root) which will be executed after the test itself has ended."
      form={form}
      initialValues={{command}}
      disabled={!isPostRunAvailable}
      readOnly={readOnly}
      onConfirm={onSave}
    >
      <FormItem name="command" label="Command">
        <CommandInput />
      </FormItem>
    </CardForm>
  );
};

export default PostRun;
