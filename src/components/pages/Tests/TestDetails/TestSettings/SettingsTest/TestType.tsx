import {memo, useMemo} from 'react';

import {Form, Select} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useExecutorsPick} from '@store/executors';

import {remapExecutors} from '@utils/executors';
import {externalLinks} from '@utils/externalLinks';
import {required} from '@utils/form';

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
  const {executors = []} = useExecutorsPick('executors');
  const remappedExecutors = useMemo(() => remapExecutors(executors), [executors]);

  const onSave = () => {
    return updateTest({type: form.getFieldValue('type')});
  };

  return (
    <Form form={form} onFinish={onSave} name="test-settings-test-type" initialValues={{type}} disabled={!mayEdit}>
      <ConfigurationCard
        title="Test type"
        description="Define the test type for this test."
        onConfirm={onSave}
        onCancel={() => {
          form.resetFields();
        }}
        footerText={
          <>
            Learn more about <ExternalLink href={externalLinks.testTypes}>test types and executors</ExternalLink>
          </>
        }
        enabled={mayEdit}
      >
        <FullWidthSpace size={32} direction="vertical">
          <FormItem name="type" rules={[required]}>
            <Select showSearch options={remappedExecutors} />
          </FormItem>
        </FullWidthSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default memo(TestType);