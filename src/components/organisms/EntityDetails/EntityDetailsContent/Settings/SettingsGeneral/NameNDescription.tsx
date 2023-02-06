import {useContext} from 'react';

import {Form, Input} from 'antd';

import {Entity} from '@models/entity';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {useUpdateTestSuiteMutation} from '@services/testSuites';
import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

const {TextArea} = Input;

const namingMap: {[key in Entity]: string} = {
  'test-suites': 'test suite',
  tests: 'test',
};

const NameNDescription: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
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
        name: values.name,
        executionRequest: {
          description: values.description,
        },
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was successfully updated.`);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <Form form={form} onFinish={onSave} name="general-settings-name-description" initialValues={{name, description}}>
      <ConfigurationCard
        title={`${uppercaseFirstSymbol(namingMap[entity])} name & description`}
        description="Define the name and description of the project which will be displayed across the Dashboard and CLI"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
      >
        <StyledSpace size={32} direction="vertical">
          <StyledFormItem name="name" rules={[required]}>
            <Input placeholder="Name" disabled />
          </StyledFormItem>
          <StyledFormItem name="description">
            <TextArea placeholder="Description" autoSize={{minRows: 2, maxRows: 3}} />
          </StyledFormItem>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default NameNDescription;
