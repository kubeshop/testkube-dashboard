import {Form, Popover} from 'antd';

import {Checkbox, FormItem, Text} from '@custom-antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledPopoverContainer, StyledQuestionCircleOutlined} from './FailureHandling.styled';

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

interface FailureHandlingProps {
  readOnly?: boolean;
}

const FailureHandling: React.FC<FailureHandlingProps> = ({readOnly}) => {
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
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', `Test was successfully updated.`));
  };

  return (
    <CardForm
      name="general-settings-failure-handling"
      title="Failure handling"
      description="Define how Testkube should treat occurring errors."
      form={form}
      initialValues={{negativeTest}}
      disabled={!mayEdit}
      readOnly={readOnly}
      onConfirm={onSave}
    >
      <FormItem name="negativeTest" valuePropName="checked">
        <Checkbox>
          Invert test result
          <Popover content={popoverContent}>
            <StyledQuestionCircleOutlined />
          </Popover>
        </Checkbox>
      </FormItem>
    </CardForm>
  );
};

export default FailureHandling;
