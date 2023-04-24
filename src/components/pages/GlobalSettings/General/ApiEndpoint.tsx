import {useState} from 'react';

import {Form, Input, Space} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem, Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {useApiEndpoint, useUpdateApiEndpoint} from '@services/apiEndpoint';

type ApiEndpointFormValues = {
  endpoint: string;
};

const ApiEndpoint: React.FC = () => {
  const [form] = Form.useForm<ApiEndpointFormValues>();

  const [isLoading, setIsLoading] = useState(false);

  const apiEndpoint = useApiEndpoint();
  const updateApiEndpoint = useUpdateApiEndpoint();

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
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = (values: ApiEndpointFormValues) => {
    setIsLoading(true);
    checkApiEndpoint(values.endpoint);
  };

  return (
    <Form form={form} onFinish={onSave} name="global-settings-api-endpoint" initialValues={{endpoint: apiEndpoint}}>
      <ConfigurationCard
        title="testkube API endpoint"
        description="Please provide the TestKube API endpoint for your installation. The endpoint needs to be accessible from your browser"
        footerText={
          <Text className="regular middle">
            Learn more about{' '}
            <ExternalLink href="https://kubeshop.github.io/testkube/concepts/common-issues/#why-is-the-testkube-dashboard-not-working-or-does-not-return-results">
              testkube API endpoints
            </ExternalLink>
          </Text>
        }
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        confirmButtonText={isLoading ? 'Loading...' : 'Save'}
      >
        <Space size={32} direction="vertical" style={{width: '100%'}}>
          <FormItem name="endpoint">
            <Input placeholder="Endpoint" />
          </FormItem>
        </Space>
      </ConfigurationCard>
    </Form>
  );
};

export default ApiEndpoint;
