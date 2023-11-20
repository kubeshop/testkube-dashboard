import {memo, useMemo} from 'react';

import {Form, Select} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem} from '@custom-antd';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useExecutorsPick} from '@store/executors';

import {remapExecutors} from '@utils/executors';
import {externalLinks} from '@utils/externalLinks';
import {required} from '@utils/form';

type TestTypeProps = {
  type: string;
  readOnly?: boolean;
  updateTest: (data: {type: string}) => void;
};

type TestTypeFormValues = {
  type: string;
};

const TestType: React.FC<TestTypeProps> = props => {
  const {type, readOnly, updateTest} = props;

  const [form] = Form.useForm<TestTypeFormValues>();

  const mayEdit = usePermission(Permissions.editEntity);
  const {executors = []} = useExecutorsPick('executors');
  const remappedExecutors = useMemo(() => remapExecutors(executors), [executors]);

  const onSave = () => {
    return updateTest({type: form.getFieldValue('type')});
  };

  const footer = (
    <>
      Learn more about <ExternalLink href={externalLinks.testTypes}>test types and executors</ExternalLink>
    </>
  );

  return (
    <CardForm
      name="test-settings-test-type"
      title="Test type"
      description="Define the test type for this test."
      footer={footer}
      form={form}
      initialValues={{type}}
      disabled={!mayEdit}
      readOnly={readOnly}
      onConfirm={onSave}
    >
      <FormItem name="type" rules={[required]}>
        <Select showSearch options={remappedExecutors} />
      </FormItem>
    </CardForm>
  );
};

export default memo(TestType);
