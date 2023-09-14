import React, {useRef, useState} from 'react';

import {Form, Input} from 'antd';

import {Button, FormItem, Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useInViewport from '@hooks/useInViewport';

import {useModal} from '@modal/hooks';

import {ErrorNotificationConfig} from '@models/notifications';

import {LabelsSelect, NotificationContent} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {useAddTestSuiteMutation} from '@services/testSuites';

import {useTelemetry} from '@telemetry/hooks';

import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledFormSpace} from './CreationModal.styled';

const {TextArea} = Input;

type TestSuiteCreationModalFormValues = {
  name: string;
  description: string;
  labels: string[];
};

const TestSuiteCreationModalContent: React.FC = () => {
  const [form] = Form.useForm<TestSuiteCreationModalFormValues>();

  const {close} = useModal();
  const telemetry = useTelemetry();
  const openSettings = useDashboardNavigate((name: string) => `/test-suites/${name}/settings/tests`);

  const [addTestSuite, {isLoading}] = useAddTestSuiteMutation();

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  const onFinish = (values: TestSuiteCreationModalFormValues) => {
    addTestSuite({
      ...values,
      labels: decomposeLabels(values.labels),
    })
      .then(displayDefaultNotificationFlow)
      .then(res => {
        telemetry.event('createTestSuite');
        openSettings(res.data.metadata.name);
        close();
      })
      .catch(err => {
        setError(err);

        if (!inTopInViewport && topRef && topRef.current) {
          topRef.current.scrollIntoView();
        }
      });
  };

  return (
    <Form
      form={form}
      name="test-suite-creation"
      onFinish={onFinish}
      initialValues={{name: '', description: '', labels: []}}
    >
      <div ref={topRef} />
      <StyledFormSpace size={24} direction="vertical">
        <Text className="regular big">Test suite details</Text>
        {error ? <NotificationContent status="failed" message={error.message} title={error.title} /> : null}
        <FormItem name="name" rules={[required, k8sResourceNamePattern, k8sResourceNameMaxLength]}>
          <Input placeholder="Name" />
        </FormItem>
        <FormItem name="description">
          <TextArea placeholder="Description" autoSize={{minRows: 4, maxRows: 6}} />
        </FormItem>
        <FormItem name="labels">
          <LabelsSelect />
        </FormItem>
        <FormItem shouldUpdate>
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
        </FormItem>
      </StyledFormSpace>
    </Form>
  );
};

export default React.memo(TestSuiteCreationModalContent);
