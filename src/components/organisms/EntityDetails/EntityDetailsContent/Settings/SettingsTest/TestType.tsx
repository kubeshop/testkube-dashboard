import {memo} from 'react';

import {Form, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';

import {ExternalLink} from '@atoms';

import {ConfigurationCard} from '@molecules';

import {remapExecutors} from '@wizards/AddTestWizard/utils';

import {required} from '@utils/form';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

type TestTypeProps = {
  type: string;
  updateTest: (data: any) => void;
};

const TestType: React.FC<TestTypeProps> = props => {
  const {type, updateTest} = props;

  const [form] = Form.useForm();

  const executors = useAppSelector(selectExecutors);
  const remappedExecutors = remapExecutors(executors);

  const onSave = (values: any) => {
    updateTest({type: values.type});
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

export default memo(TestType);
