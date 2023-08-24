import {FC, memo, useContext, useRef, useState} from 'react';

import {Form, Input} from 'antd';

import {ModalContext} from '@contexts/ModalContext';

import {Button} from '@custom-antd/Button';
import {FormItem} from '@custom-antd/Form/FormItem';
import {Text} from '@custom-antd/Typography/Text';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useInViewport} from '@hooks/useInViewport';

import type {Option} from '@models/form';
import type {ErrorNotificationConfig} from '@models/notifications';

import {LabelsSelect} from '@molecules/LabelsSelect';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';
import {NotificationContent} from '@molecules/Notification/NotificationContent';

import {useAddTestSuiteMutation} from '@services/testSuites';

import {useTelemetry} from '@telemetry/hooks';

import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledFormSpace} from './TestSuiteCreationModalContent/CreationModal.styled';

const {TextArea} = Input;

type TestSuiteCreationModalFormValues = {
  name: string;
  description: string;
  labels: readonly Option[];
};

export const TestSuiteCreationModalContent: FC = memo(() => {
  const [form] = Form.useForm<TestSuiteCreationModalFormValues>();

  const {closeModal} = useContext(ModalContext);
  const telemetry = useTelemetry();
  const openSettings = useDashboardNavigate((name: string) => `/test-suites/${name}/settings/tests`);

  const [addTestSuite, {isLoading}] = useAddTestSuiteMutation();
  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  const onFinish = (values: TestSuiteCreationModalFormValues) => {
    addTestSuite({
      ...values,
      labels: decomposeLabels(localLabels),
    })
      .then(displayDefaultNotificationFlow)
      .then(res => {
        telemetry.event('createTestSuite');
        openSettings(res.data.metadata.name);
        closeModal();
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
        <LabelsSelect onChange={setLocalLabels} />
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
});
