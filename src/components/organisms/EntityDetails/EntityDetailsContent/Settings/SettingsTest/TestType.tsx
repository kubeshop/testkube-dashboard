import {memo} from 'react';

import {Form, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';

import {ExternalLink} from '@atoms';

import {ConfigurationCard} from '@molecules';

import {remapExecutors} from '@utils/executors';
import {required} from '@utils/form';

import {Permissions, usePermission} from '@permissions/base';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

type TestTypeProps = {
  type: string;
  updateTest: (data: {type: string}) => void;
};

type TestTypeFormValues = {
  type: string;
};

const TestType: React.FC<TestTypeProps> = props => {
  const {type, updateTest} = props;

  const [form] = Form.useForm<TestTypeFormValues>();

  const mayEdit = usePermission(Permissions.editEntity);
  const executors = useAppSelector(selectExecutors);
  const remappedExecutors = remapExecutors(executors);

  const onSave = (values: TestTypeFormValues) => {
    updateTest({type: values.type});
  };

  return (
    <Form form={form} onFinish={onSave} name="test-settings-test-type" initialValues={{type}} disabled={!mayEdit}>
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
        enabled={mayEdit}
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
