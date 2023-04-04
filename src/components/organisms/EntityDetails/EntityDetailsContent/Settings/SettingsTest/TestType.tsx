import {useContext} from 'react';

import {Form, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';

import {ExternalLink} from '@atoms';

import {ConfigurationCard, notificationCall} from '@molecules';

import {remapExecutors} from '@wizards/AddTestWizard/utils';

import {required} from '@utils/form';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

const TestType = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const {type} = entityDetails;

  const [form] = Form.useForm();

  const executors = useAppSelector(selectExecutors);
  const remappedExecutors = remapExecutors(executors);

  const [updateTest] = useUpdateTestMutation();

  const onSave = (values: any) => {
    updateTest({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        type: values.type,
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Test type was successfully updated.`);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <Form form={form} onFinish={onSave} name="test-settings-test-type" initialValues={{type}}>
      <ConfigurationCard
        title="Test type"
        description="Define the test type for this test."
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        footerText={
          <>
            Learn more about{' '}
            <ExternalLink href="https://kubeshop.github.io/testkube/category/test-types">
              test types and executors
            </ExternalLink>
          </>
        }
      >
        <StyledSpace size={32} direction="vertical">
          <StyledFormItem name="type" rules={[required]}>
            <Select showSearch options={remappedExecutors} />
          </StyledFormItem>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default TestType;
