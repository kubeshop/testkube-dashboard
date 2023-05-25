import {useContext} from 'react';

import {Form} from 'antd';

import {CommandInput} from '@atoms';

import {EntityDetailsContext} from '@contexts';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {displayDefaultNotificationFlow} from '@utils/notification';

type PreRunFormValues = {
  command: string;
};

const PreRun: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const isPreRunAvailable = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<PreRunFormValues>();

  const [updateTest] = useUpdateTestMutation();

  if (!entity || !entityDetails) {
    return null;
  }

  const command = entityDetails?.executionRequest?.preRunScript;

  const onSave = () => {
    const values = form.getFieldsValue();

    return updateTest({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        executionRequest: {
          ...entityDetails.executionRequest,
          preRunScript: values.command,
        },
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => notificationCall('passed', `Pre-Run command was successfully updated.`));
  };

  return (
    <Form
      form={form}
      name="execution-settings-pre-run"
      initialValues={{command}}
      disabled={!isPreRunAvailable}
      layout="vertical"
    >
      <ConfigurationCard
        title="Pre-Run phase"
        description="You can run a command or a script (relative to your source root) which will be executed before the test itself is started."
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

export default PreRun;
