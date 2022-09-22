import React, {useContext, useEffect} from 'react';

import {Form, Input, Select} from 'antd';

import {openSettingsTabConfig} from '@redux/reducers/configSlice';

import {Button, Text} from '@custom-antd';

import {required} from '@utils/form';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useGetLabelsQuery} from '@services/labels';
import {useAddTestSuiteMutation} from '@services/testSuites';

import {AnalyticsContext, MainContext} from '@contexts';

import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';

const {TextArea} = Input;
const {Option} = Select;

type AddTestSuitePayload = {
  data?: {
    metadata: {
      name: string;
    };
    spec: {
      content: any;
      type: any;
    };
    status: {
      // eslint-disable-next-line camelcase
      last_execution: any;
    };
  };
  error?: any;
};

const TestSuiteCreationModalContent: React.FC = () => {
  const [form] = Form.useForm();
  const {navigate, dispatch} = useContext(MainContext);
  const {trackEvent} = useContext(AnalyticsContext);

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
      .then((res: AddTestSuitePayload) => {
        displayDefaultNotificationFlow(res, () => {
          trackEvent('create-test-suites', {
            type: res?.data?.spec?.type,
          });

          dispatch(openSettingsTabConfig());
          navigate(`test-suites/executions/${res?.data?.metadata?.name}`);
        });
      })
      .catch(err => displayDefaultErrorNotification(err));
  };

  useEffect(() => {
    return () => {
      form.resetFields();
    };
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
            {data?.map((value: string, index: number) => {
              const key = `add-test-suite-label_${index}`;

              return (
                <Option key={key} value={`${index}_${value}`}>
                  {value}
                </Option>
              );
            })}
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
