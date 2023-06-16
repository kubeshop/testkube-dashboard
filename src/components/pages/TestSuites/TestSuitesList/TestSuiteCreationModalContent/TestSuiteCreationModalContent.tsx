import React, {useContext, useEffect, useRef, useState} from 'react';

import {Form, Input} from 'antd';

import {AnalyticsContext, DashboardContext, MainContext, ModalContext} from '@contexts';

import {Button, FormItem, Text} from '@custom-antd';

import useInViewport from '@hooks/useInViewport';

import {Option} from '@models/form';
import {ErrorNotificationConfig} from '@models/notifications';

import {LabelsSelect, NotificationContent} from '@molecules';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {setSettingsTabConfig} from '@redux/reducers/configSlice';

import {useAddTestSuiteMutation} from '@services/testSuites';

import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledFormSpace} from './CreationModal.styled';

const {TextArea} = Input;

type TestSuiteCreationModalFormValues = {
  name: string;
  description: string;
  labels: readonly Option[];
};

const TestSuiteCreationModalContent: React.FC = () => {
  const [form] = Form.useForm<TestSuiteCreationModalFormValues>();

  const {dispatch} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const {analyticsTrack} = useContext(AnalyticsContext);
  const {setModalConfig, setModalOpen} = useContext(ModalContext);

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
      .then(res => displayDefaultNotificationFlow(res))
      .then(res => {
        if (res && 'data' in res) {
          analyticsTrack('trackEvents', {
            uiEvent: 'create-test-suites',
          });

          dispatch(setSettingsTabConfig({entity: 'test-suites', tab: 'Tests'}));

          navigate(`/test-suites/executions/${res.data.metadata.name}`);

          setModalOpen(false);
          setModalConfig({
            width: 500,
            title: '',
            content: <></>,
          });
        }
      })
      .catch(err => {
        setError(err);

        if (!inTopInViewport && topRef && topRef.current) {
          topRef.current.scrollIntoView();
        }
      });
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
};

export default React.memo(TestSuiteCreationModalContent);
