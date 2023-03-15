import {useContext} from 'react';

import {Form, Input} from 'antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

const PreRun: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const [form] = Form.useForm();

  const [updateTest] = useUpdateTestMutation();

  if (!entity || !entityDetails) {
    return null;
  }

  const command = entityDetails?.executionRequest?.preRunScript;

  const onSave = (values: any) => {
    updateTest({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        executionRequest: {
          ...entityDetails.executionRequest,
          preRunScript: values.command,
        },
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Pre-Run command was successfully updated.`);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <Form form={form} onFinish={onSave} name="execution-settings-pre-run" initialValues={{command}}>
      <ConfigurationCard
        title="Pre-Run phase"
        description="You can run a command or a script (relative to your source root) which will be executed before the test itself is started. "
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
      >
        <StyledSpace size={32} direction="vertical">
          <StyledFormItem name="command">
            <Input placeholder="e.g.: myscript.sh" />
          </StyledFormItem>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default PreRun;
