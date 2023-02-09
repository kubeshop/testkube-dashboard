import {useContext} from 'react';

import {Form, Popover} from 'antd';

import {Checkbox, Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledPopoverContainer, StyledQuestionCircleOutlined} from '../Settings.styled';

const popoverContent = (
  <StyledPopoverContainer>
    <Text className="middle regular">
      If this is checked - failing tests will be marked as passed and passed tests will be marked as failed.
    </Text>
  </StyledPopoverContainer>
);
const FailureHandling: React.FC = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const [form] = Form.useForm();

  const [updateTest] = useUpdateTestMutation();

  if (!entityDetails) {
    return null;
  }

  const negativeTest = entityDetails?.executionRequest?.negativeTest;

  const onSave = (values: any) => {
    updateTest({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        executionRequest: {
          ...entityDetails.executionRequest,
          negativeTest: values.negativeTest,
        },
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Test was successfully updated.`);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <Form form={form} onFinish={onSave} initialValues={{negativeTest}} name="general-settings-failure-handling">
      <ConfigurationCard
        title="Failure handling"
        description="Define how Testkube should treat occurring errors."
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
      >
        <StyledFormItem name="negativeTest" valuePropName="checked">
          <Checkbox>
            Invert test result
            <Popover content={popoverContent}>
              <StyledQuestionCircleOutlined />
            </Popover>
          </Checkbox>
        </StyledFormItem>
      </ConfigurationCard>
    </Form>
  );
};

export default FailureHandling;