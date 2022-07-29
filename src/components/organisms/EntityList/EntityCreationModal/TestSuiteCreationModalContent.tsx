import React, {useContext, useEffect} from 'react';

import {Form, Input, Select} from 'antd';

import {Button, Text} from '@custom-antd';

import {notificationCall} from '@molecules';

import {required} from '@utils/form';

import {useGetLabelsQuery} from '@services/labels';
import {useAddTestSuiteMutation} from '@services/testSuites';

import {MainContext} from '@contexts';

import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';

const {TextArea} = Input;
const {Option} = Select;

const TestSuiteCreationModalContent: React.FC = () => {
  const [form] = Form.useForm();
  const {navigate} = useContext(MainContext);

  const {data} = useGetLabelsQuery(null);
  const [addTestSuite, {isLoading}] = useAddTestSuiteMutation();

  const onFinish = (values: any) => {
    addTestSuite({
      ...values,
      labels: values.labels.reduce((previousValue: any, currentValue: string) => {
        const keyValuePair = currentValue.split('_');
        return {
          ...previousValue,
          [keyValuePair[0]]: keyValuePair[1],
        };
      }, {}),
    })
      .then((res: any) => {
        if (res.error) {
          if (res.error.data) {
            const errorTitle = res.error?.data?.title || 'Unknown error';
            const errorDetails = res.error?.data.detail || 'Something went wrong';
            notificationCall('failed', errorTitle, errorDetails);
          } else {
            notificationCall('failed', res.error.error);
          }
        } else {
          const testSuiteName = res?.data?.metadata?.name;
          navigate(`test-suites/executions/${testSuiteName}`);
        }
      })
      .catch(err => {
        if (err instanceof Error) {
          notificationCall('failed', 'Unknown error', String(err) || 'Something went wrong');
        }
      });
  };

  useEffect(() => {
    return () => {
      form.resetFields();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      form={form}
      name="test-suite-creation"
      onFinish={onFinish}
      initialValues={{name: '', description: '', labels: []}}
    >
      <StyledFormSpace size={24} direction="vertical">
        <Text className="regular big">Test suite details</Text>
        <StyledFormItem name="name" rules={[required]}>
          <Input placeholder="Name" />
        </StyledFormItem>
        <StyledFormItem name="description">
          <TextArea placeholder="Description" autoSize={{minRows: 4, maxRows: 6}} />
        </StyledFormItem>
        <StyledFormItem name="labels">
          <Select placeholder="Labels" mode="multiple" allowClear showArrow>
            {data?.map((value: string, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <Option key={index} value={`${index}_${value}`}>
                {value}
              </Option>
            ))}
          </Select>
        </StyledFormItem>
        <StyledFormItem>
          <Button htmlType="submit" disabled={isLoading} loading={isLoading} style={{width: '118px'}}>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </StyledFormItem>
      </StyledFormSpace>
    </Form>
  );
};

export default React.memo(TestSuiteCreationModalContent);
