import {useContext} from 'react';

import {Form, Input} from 'antd';

import {Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import Colors from '@styles/Colors';

import {Permissions, usePermission} from '@permissions/base';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

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

  const onSave = (values: PreRunFormValues) => {
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
      .then(res => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Pre-Run command was successfully updated.`);
        });
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <Form
      form={form}
      onFinish={onSave}
      name="execution-settings-pre-run"
      initialValues={{command}}
      disabled={!isPreRunAvailable}
    >
      <ConfigurationCard
        title="Pre-Run phase"
        description="You can run a command or a script (relative to your source root) which will be executed before the test itself is started."
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
      >
        <StyledSpace size={32} direction="vertical">
          <StyledFormItem name="command">
            <Input
              placeholder="e.g.: myscript.sh"
              prefix={
                <Text className="big regular" color={Colors.slate500}>
                  $
                </Text>
              }
            />
          </StyledFormItem>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default PreRun;
