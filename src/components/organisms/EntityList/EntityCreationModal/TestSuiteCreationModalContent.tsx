import React, {useContext, useEffect} from 'react';

import {Form, Input, Select} from 'antd';

import {Button, Text} from '@custom-antd';

import {required} from '@utils/form';

import {useGetLabelsQuery} from '@services/labels';
import {useAddTestSuiteMutation} from '@services/testSuites';

import {MainContext} from '@contexts';

import {openSettingsTabConfig} from '@src/redux/reducers/configSlice';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@src/utils/notification';

import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';

const {TextArea} = Input;
const {Option} = Select;

const TestSuiteCreationModalContent: React.FC = () => {
  const [form] = Form.useForm();
  const {navigate, dispatch} = useContext(MainContext);

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
        displayDefaultNotificationFlow(res, () => {
          const testSuiteName = res?.data?.metadata?.name;

          dispatch(openSettingsTabConfig());
          navigate(`test-suites/executions/${testSuiteName}`);
        });
      })
      .catch(err => displayDefaultErrorNotification(err));
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
