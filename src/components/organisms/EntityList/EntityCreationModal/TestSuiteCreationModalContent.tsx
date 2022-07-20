import {Form} from 'antd';

import {Button, Input, Text} from '@custom-antd';

import {required} from '@utils/form';

import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';

const TestSuiteCreationModalContent: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form name="test-suite-creation" onFinish={onFinish}>
      <StyledFormSpace size={24} direction="vertical">
        <Text className="regular big">Test suite details</Text>
        <StyledFormItem name="name" rules={[required]} style={{marginBottom: '0'}}>
          <Input placeholder="Name" />
        </StyledFormItem>
        <StyledFormItem style={{marginBottom: '0'}}>
          <Button htmlType="submit">Create</Button>
        </StyledFormItem>
      </StyledFormSpace>
    </Form>
  );
};

export default TestSuiteCreationModalContent;
