import React, {useContext, useEffect, useState} from 'react';

import {Form, Input} from 'antd';

import {Option} from '@models/form';

import {openSettingsTabConfig} from '@redux/reducers/configSlice';

import {Button, Text} from '@custom-antd';

import {LabelsSelect} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useAddTestSuiteMutation} from '@services/testSuites';

import {AnalyticsContext, MainContext} from '@contexts';

import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';

const {TextArea} = Input;

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
  const {analyticsTrack} = useContext(AnalyticsContext);

  const [addTestSuite, {isLoading}] = useAddTestSuiteMutation();
  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);

  const onFinish = (values: any) => {
    addTestSuite({
      ...values,
      labels: decomposeLabels(localLabels),
    })
      .then((res: AddTestSuitePayload) => {
        displayDefaultNotificationFlow(res, () => {
          analyticsTrack('trackEvents', {
            uiEvent: 'create-test-suites',
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
        <StyledFormItem name="name" rules={[required, k8sResourceNamePattern, k8sResourceNameMaxLength]}>
          <Input placeholder="Name" />
        </StyledFormItem>
        <StyledFormItem name="description">
          <TextArea placeholder="Description" autoSize={{minRows: 4, maxRows: 6}} />
        </StyledFormItem>
        <LabelsSelect onChange={setLocalLabels} />
        <StyledFormItem shouldUpdate>
          {({isFieldsTouched}) => (
            <Button
              htmlType="submit"
              disabled={isLoading || !isFieldsTouched()}
              loading={isLoading}
              style={{width: '118px'}}
              data-test="add-a-new-test-suite-create-button"
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          )}
        </StyledFormItem>
      </StyledFormSpace>
    </Form>
  );
};

export default React.memo(TestSuiteCreationModalContent);
