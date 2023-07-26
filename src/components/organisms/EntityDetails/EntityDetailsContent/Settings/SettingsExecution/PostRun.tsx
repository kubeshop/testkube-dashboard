import {useContext} from 'react';

import {Form} from 'antd';

import {CommandInput} from '@atoms';

import {EntityDetailsContext} from '@contexts';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {displayDefaultNotificationFlow} from '@utils/notification';

type PostRunFormValues = {
  command: string;
};

const PostRun: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const isPostRunAvailable = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<PostRunFormValues>();

  const [updateTest] = useUpdateTestMutation();

  if (!entity || !entityDetails) {
    return null;
  }

  const command = entityDetails?.executionRequest?.postRunScript;

  const onSave = () => {
    const values = form.getFieldsValue();

    return updateTest({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        executionRequest: {
          ...entityDetails.executionRequest,
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
        title="Post execution / Teardown phase"
        description="Overwrite the default command which is run after a successful test execution"
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
