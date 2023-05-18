import {useContext} from 'react';

import {Form, Input} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem, FullWidthSpace, Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {externalLinks} from '@utils/externalLinks';
import {digits} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import {Permissions, usePermission} from '@permissions/base';

import {EntityDetailsContext} from '@contexts';

type TimeoutForm = {
  activeDeadlineSeconds?: number;
};

const Timeout: React.FC = () => {
  const {entityDetails} = useContext(EntityDetailsContext);
  const {executionRequest, name} = entityDetails;

  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<TimeoutForm>();

  const [updateTest] = useUpdateTestMutation();

  const onSave = () => {
    const values = form.getFieldsValue();
    const {activeDeadlineSeconds} = values;

    return updateTest({
      id: name,
      data: {
        ...entityDetails,
        executionRequest: {
          ...executionRequest,
          activeDeadlineSeconds: activeDeadlineSeconds ? Number(activeDeadlineSeconds) : 0,
        },
      },
    }).then(res => {
      return displayDefaultNotificationFlow(res, () => {
        notificationCall('passed', 'Test Timeout was successfully updated.');
      });
    });
  };

  return (
    <Form
      form={form}
      name="general-settings-name-description"
      initialValues={{activeDeadlineSeconds: executionRequest?.activeDeadlineSeconds}}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Timeout"
        description="Define the timeout in seconds after which this test will fail."
        onConfirm={onSave}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
        footerText={
          <Text className="regular middle">
            Learn more about <ExternalLink href={externalLinks.addingTimeout}>Timeouts</ExternalLink>
          </Text>
        }
      >
        <FullWidthSpace size={32} direction="vertical">
          <FormItem name="activeDeadlineSeconds" rules={[digits]}>
            <Input placeholder="Timeout in seconds" />
          </FormItem>
        </FullWidthSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Timeout;
