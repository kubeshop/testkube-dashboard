import React, {useContext, useEffect, useRef, useState} from 'react';

import {Form, Space, Steps} from 'antd';

import {DashboardContext} from '@contexts';

import {Input, Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useInViewport from '@hooks/useInViewport';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

import {ErrorNotificationConfig} from '@models/notifications';

import {NotificationContent} from '@molecules';

import {useCreateTriggerMutation, useGetTriggersKeyMapQuery} from '@services/triggers';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useTriggersPick, useTriggersSync} from '@store/triggers';

import {safeRefetch} from '@utils/fetchUtils';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {getResourceIdentifierSelector} from '../../utils';

import {StyledNotificationContainer} from './AddTriggerModal.styled';
import ModalFirstStep from './ModalFirstStep';
import ModalSecondStep from './ModalSecondStep';
import {StepsEnum} from './types';

interface FirstStepValues {
  resource?: string;
  event?: string;
  resourceLabelSelector?: string[];
  resourceNameSelector?: string;
}

const AddTriggerModal: React.FC = () => {
  const {namespace} = useClusterDetailsPick('namespace');
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);
  const {location} = useContext(DashboardContext);
  const openDetails = useDashboardNavigate((name: string) => `/triggers/${name}`);
  const {close} = useModal();

  const [createTrigger, {isLoading}] = useCreateTriggerMutation();

  const {data: triggersKeyMap, refetch: refetchKeyMap} = useGetTriggersKeyMapQuery(null, {skip: !isClusterAvailable});

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(StepsEnum.condition);
  const [name, setName] = useState('');
  const [firstStepValues, setFirstStepValues] = useState<FirstStepValues>({});

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();

    const resourceSelector = getResourceIdentifierSelector(
      firstStepValues.resourceLabelSelector || firstStepValues.resourceNameSelector!,
      namespace
    );

    const testSelector = getResourceIdentifierSelector(values.testLabelSelector || values.testNameSelector, namespace);

    const [action, execution] = values.action.split(' ');

    const body = {
      ...(name ? {name} : {}),
      resource: firstStepValues.resource,
      event: firstStepValues.event,
      action,
      execution,
      testSelector,
      resourceSelector,
    };
    createTrigger(body)
      .then(displayDefaultNotificationFlow)
      .then(res => openDetails(res.data.name))
      .catch(err => {
        setError(err);

        if (!inTopInViewport && topRef && topRef.current) {
          topRef.current.scrollIntoView();
        }
      })
      .finally(() => {
        close();
      });
  };

  const currentData = useTriggersPick('keyMap');
  useTriggersSync({
    keyMap: triggersKeyMap ?? currentData.keyMap,
  });

  useEffect(() => {
    safeRefetch(refetchKeyMap);
  }, [location]);

  return (
    <>
      <div ref={topRef} />
      <Space size={24} direction="vertical" style={{width: '100%', marginTop: 0}}>
        <Space direction="vertical" style={{width: '100%'}}>
          {error ? (
            <StyledNotificationContainer>
              <NotificationContent status="failed" message={error.message} title={error.title} />
            </StyledNotificationContainer>
          ) : null}
          <Text className="regular middle">Name</Text>
          <Input
            placeholder="e.g.: container-deployment-xyz"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
          />
        </Space>
        <Steps current={currentStep} items={[{title: 'Condition'}, {title: 'Action'}]} />
        <Form layout="vertical" onFinish={onFinish} form={form} name="add-trigger-form">
          {currentStep === StepsEnum.condition ? (
            <ModalFirstStep setCurrentStep={setCurrentStep} setFirstStepValues={setFirstStepValues} />
          ) : (
            <ModalSecondStep setCurrentStep={setCurrentStep} isLoading={isLoading} />
          )}
        </Form>
      </Space>
    </>
  );
};

export default AddTriggerModal;
