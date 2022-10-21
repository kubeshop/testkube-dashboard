import {useContext} from 'react';

import {Form, Input, Space} from 'antd';

import {Text} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {digits} from '@utils/form';

import {EntityDetailsContext} from '@contexts';

const Timeout: React.FC = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const [form] = Form.useForm();

  const onSave = (values: any) => {
    // updateRequestsMap[entity]({
    //   id: entityDetails.name,
    //   data: {
    //     ...entityDetails,
    //     name: values.name,
    //     executionRequest: {
    //       description: values.description,
    //     },
    //   },
    // })
    //   .then((res: any) => {
    //     displayDefaultNotificationFlow(res, () => {
    //       notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was succesfully updated.`);
    //     });
    //   })
    //   .catch((err: any) => {
    //     displayDefaultErrorNotification(err);
    //   });
  };

  return (
    <Form form={form} onFinish={onSave} name="general-settings-name-description" initialValues={{timeout: ''}}>
      <ConfigurationCard
        title="Timeout"
        description="Define the timeout in seconds after which this test will fail."
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        footerText={
          <Text className="regular middle">
            Learn more about{' '}
            <a
              href="https://kubeshop.github.io/testkube/using-testkube/test-suites/testsuites-creating/"
              target="_blank"
            >
              Timeouts
            </a>
          </Text>
        }
      >
        <Space size={32} direction="vertical" style={{width: '100%'}}>
          <Form.Item name="name" rules={[digits]} style={{marginBottom: '0px'}}>
            <Input placeholder="Timeout in seconds" />
          </Form.Item>
        </Space>
      </ConfigurationCard>
    </Form>
  );
};

export default Timeout;
