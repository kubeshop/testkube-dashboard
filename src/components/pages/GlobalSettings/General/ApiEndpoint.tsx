import {useContext, useState} from 'react';

import {Form, Input, Space} from 'antd';

import {setNamespace} from '@redux/reducers/configSlice';

import {FormItem, Text} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {MainContext} from '@contexts';

import {getApiDetails, saveApiEndpoint, useApiEndpoint} from '@services/apiEndpoint';

const ApiEndpoint = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const {dispatch} = useContext(MainContext);
  const apiEndpoint = useApiEndpoint();

  const checkApiEndpoint = async (endpoint: string) => {
    try {
      const {url, namespace} = await getApiDetails(endpoint);

      saveApiEndpoint(url);
      dispatch(setNamespace(namespace));
      setTimeout(() => {
        notificationCall('passed', 'API endpoint set up  successfully');
        form.resetFields();
      });
    } catch (error) {
      notificationCall('failed', 'Could not receive data from the specified API endpoint');
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = (values: any) => {
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
            <a
              href="https://kubeshop.github.io/testkube/concepts/common-issues/#why-is-the-testkube-dashboard-not-working-or-does-not-return-results"
              target="_blank"
            >
              testkube API endpoints
            </a>
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
