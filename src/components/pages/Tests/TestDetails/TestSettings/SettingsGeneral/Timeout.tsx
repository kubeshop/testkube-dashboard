import {FC} from 'react';

import {Form, Input} from 'antd';

import {ExternalLink} from '@atoms/ExternalLink';

import {FormItem} from '@custom-antd/Form/FormItem';
import {Text} from '@custom-antd/Typography/Text';

import {notificationCall} from '@molecules/Notification';

import {CardForm} from '@organisms/CardForm';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {externalLinks} from '@utils/externalLinks';
import {digits} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

type TimeoutForm = {
  activeDeadlineSeconds?: number;
};

export const Timeout: FC = () => {
  const {details} = useEntityDetailsPick('details');
  const {executionRequest, name} = details;

  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<TimeoutForm>();

  const [updateTest] = useUpdateTestMutation();

  const onSave = () => {
    const values = form.getFieldsValue();
    const {activeDeadlineSeconds} = values;

    return updateTest({
      id: name,
      data: {
        ...details,
        executionRequest: {
          ...executionRequest,
          activeDeadlineSeconds: activeDeadlineSeconds ? Number(activeDeadlineSeconds) : 0,
        },
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'Test Timeout was successfully updated.'));
  };

  const footer = (
    <Text className="regular middle">
      Learn more about <ExternalLink href={externalLinks.addingTimeout}>Timeouts</ExternalLink>
    </Text>
  );

  return (
    <CardForm
      name="general-settings-name-description"
      title="Timeout"
      description="Define the timeout in seconds after which this test will fail."
      footer={footer}
      form={form}
      initialValues={{activeDeadlineSeconds: executionRequest?.activeDeadlineSeconds}}
      disabled={!mayEdit}
      onConfirm={onSave}
    >
      <FormItem name="activeDeadlineSeconds" rules={[digits]}>
        <Input placeholder="Timeout in seconds" />
      </FormItem>
    </CardForm>
  );
};
