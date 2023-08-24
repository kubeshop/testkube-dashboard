import {FC} from 'react';

import {Form, Input} from 'antd';

import {ExternalLink} from '@atoms/ExternalLink';

import {FormItem} from '@custom-antd/Form/FormItem';
import {Text} from '@custom-antd/Typography/Text';

import {notificationCall} from '@molecules/Notification';

import {CardForm} from '@organisms/CardForm';

import {isApiEndpointLocked, useApiEndpoint, useUpdateApiEndpoint} from '@services/apiEndpoint';

import {Colors} from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

type ApiEndpointFormValues = {
  endpoint: string;
};

export const ApiEndpoint: FC = () => {
  const [form] = Form.useForm<ApiEndpointFormValues>();

  const apiEndpoint = useApiEndpoint();
  const updateApiEndpoint = useUpdateApiEndpoint();
  const disabled = isApiEndpointLocked();

  const checkApiEndpoint = async (endpoint: string) => {
    try {
      if (await updateApiEndpoint(endpoint)) {
        setTimeout(() => {
          notificationCall('passed', 'API endpoint set up successfully');
          form.resetFields();
        });
      }
    } catch (error) {
      notificationCall('failed', 'Could not receive data from the specified API endpoint');
    }
  };

  const onSave = () => checkApiEndpoint(form.getFieldValue('endpoint'));

  const footer = (
    <Text className="regular middle" color={`${Colors.slate400}`}>
      Learn more about <ExternalLink href={externalLinks.dashboardNotWorking}>Testkube API endpoints</ExternalLink>
    </Text>
  );

  return (
    <CardForm
      name="global-settings-api-endpoint"
      title="Testkube API endpoint"
      description="Please provide the TestKube API endpoint for your installation. The endpoint needs to be accessible from your browser"
      form={form}
      initialValues={{endpoint: apiEndpoint}}
      footer={footer}
      disabled={disabled}
      onConfirm={onSave}
    >
      <FormItem name="endpoint">
        <Input placeholder="Endpoint" />
      </FormItem>
    </CardForm>
  );
};
