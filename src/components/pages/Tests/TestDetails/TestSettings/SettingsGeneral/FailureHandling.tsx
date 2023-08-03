import {Form, Popover} from 'antd';

import {Checkbox, FormItem, Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledPopoverContainer, StyledQuestionCircleOutlined} from '@organisms/EntityDetails/EntityDetailsContent/Settings/Settings.styled';

const popoverContent = (
  <StyledPopoverContainer>
    <Text className="middle regular">
      If this is checked - failing tests will be marked as passed and passed tests will be marked as failed.
    </Text>
  </StyledPopoverContainer>
);

type FailureHandlingFormValues = {
  negativeTest: boolean;
};

const FailureHandling: React.FC = () => {
  const {details} = useEntityDetailsPick('details');
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<FailureHandlingFormValues>();

  const [updateTest] = useUpdateTestMutation();

  if (!details) {
    return null;
  }

  const negativeTest = details?.executionRequest?.negativeTest;

  const onSave = () => {
    const values = form.getFieldsValue();

    return updateTest({
      id: details.name,
      data: {
        ...details,
        executionRequest: {
          ...details.executionRequest,
          negativeTest: values.negativeTest,
        },
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => notificationCall('passed', `Test was successfully updated.`));
  };

  return (
    <Form form={form} initialValues={{negativeTest}} name="general-settings-failure-handling" disabled={!mayEdit}>
      <ConfigurationCard
        title="Failure handling"
        description="Define how Testkube should treat occurring errors."
        onConfirm={onSave}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <FormItem name="negativeTest" valuePropName="checked">
          <Checkbox>
            Invert test result
            <Popover content={popoverContent}>
              <StyledQuestionCircleOutlined />
            </Popover>
          </Checkbox>
        </FormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default FailureHandling;
