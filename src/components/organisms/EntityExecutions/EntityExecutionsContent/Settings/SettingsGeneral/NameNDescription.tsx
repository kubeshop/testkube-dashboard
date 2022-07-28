import {useContext} from 'react';

import {Form, Input, Space} from 'antd';

import {Entity} from '@models/entity';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {useUpdateTestSuiteMutation} from '@services/testSuites';
import {useUpdateTestMutation} from '@services/tests';

import {EntityExecutionsContext} from '@contexts';

const {TextArea} = Input;

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

const NameNDescription: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityExecutionsContext);
  const [form] = Form.useForm();

  const [updateTest] = useUpdateTestMutation();
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const updateRequestsMap: {[key in Entity]: any} = {
    'test-suites': updateTestSuite,
    tests: updateTest,
  };

  if (!entity || !entityDetails) {
    return null;
  }

  const name = entityDetails?.name;
  const description = entityDetails?.description;

  const onSave = (values: any) => {
    updateRequestsMap[entity]({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        ...values,
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was succesfully updated.`);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <ConfigurationCard
      title={`${uppercaseFirstSymbol(namingMap[entity])} name & description`}
      description="Define the name and description of the project which will be displayed across the Dashboard and CLI"
      onConfirm={() => {
        form.submit();
      }}
      onCancel={() => {
        form.resetFields();
      }}
      isButtonsDisabled={
        !form.isFieldsTouched() || form.getFieldsError().filter(({errors}) => errors.length).length > 0
      }
    >
      <Form form={form} onFinish={onSave} name="general-settings-name-description" initialValues={{name, description}}>
        <Space size={32} direction="vertical" style={{width: '100%'}}>
          <Form.Item name="name" rules={[required]} style={{marginBottom: '0px'}}>
            <Input placeholder="Name" disabled />
          </Form.Item>
          <Form.Item name="description" style={{marginBottom: '0px'}}>
            <TextArea placeholder="Description" autoSize={{minRows: 2, maxRows: 3}} />
          </Form.Item>
        </Space>
      </Form>
    </ConfigurationCard>
  );
};

export default NameNDescription;
