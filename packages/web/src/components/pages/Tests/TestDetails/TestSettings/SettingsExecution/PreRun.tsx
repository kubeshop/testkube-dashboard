import {Form} from 'antd';

import {CommandInput} from '@atoms';

import {FormItem} from '@custom-antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

type PreRunFormValues = {
  command: string;
};

interface PreRunProps {
  readOnly?: boolean;
}

const PreRun: React.FC<PreRunProps> = ({readOnly}) => {
  const {entity, details} = useEntityDetailsPick('entity', 'details');
  const isPreRunAvailable = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<PreRunFormValues>();

  const [updateTest] = useUpdateTestMutation();

  if (!entity || !details) {
    return null;
  }

  const command = details?.executionRequest?.preRunScript;

  const onSave = () => {
    const values = form.getFieldsValue();

    return updateTest({
      id: details.name,
      data: {
        ...details,
        executionRequest: {
          ...details.executionRequest,
          preRunScript: values.command,
        },
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', `Pre-Run command was successfully updated.`));
  };

  return (
    <CardForm
      name="execution-settings-pre-run"
      title="Pre-Run phase"
      description="You can run a command or a script (relative to your source root) which will be executed before the test itself is started."
      form={form}
      initialValues={{command}}
      disabled={!isPreRunAvailable}
      readOnly={readOnly}
      onConfirm={onSave}
    >
      <FormItem name="command" label="Command">
        <CommandInput />
      </FormItem>
    </CardForm>
  );
};

export default PreRun;
