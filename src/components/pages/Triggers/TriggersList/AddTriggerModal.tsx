import {FC, useContext, useEffect, useRef, useState} from 'react';

import {Form, Space, Steps} from 'antd';

import {DashboardContext} from '@contexts/DashboardContext';
import {MainContext} from '@contexts/MainContext';

import {Input} from '@custom-antd/Input';
import {Text} from '@custom-antd/Typography/Text';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useInViewport} from '@hooks/useInViewport';

import type {Option} from '@models/form';
import type {ErrorNotificationConfig} from '@models/notifications';

import {NotificationContent} from '@molecules/Notification/NotificationContent';

import {getResourceIdentifierSelector} from '@pages/Triggers/utils';

import {useCreateTriggerMutation, useGetTriggersKeyMapQuery} from '@services/triggers';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useTriggersPick, useTriggersSync} from '@store/triggers';

import {safeRefetch} from '@utils/fetchUtils';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledNotificationContainer} from './AddTriggerModal.styled';
import {ModalFirstStep} from './AddTriggerModal/ModalFirstStep';
import {ModalSecondStep} from './AddTriggerModal/ModalSecondStep';
import {StepsEnum} from './AddTriggerModal/types';

export const AddTriggerModal: FC = () => {
  const {namespace} = useClusterDetailsPick('namespace');
  const {isClusterAvailable} = useContext(MainContext);
  const {location} = useContext(DashboardContext);
  const openDetails = useDashboardNavigate((name: string) => `/triggers/${name}`);

  const [createTrigger, {isLoading}] = useCreateTriggerMutation();

  const {data: triggersKeyMap, refetch: refetchKeyMap} = useGetTriggersKeyMapQuery(null, {skip: !isClusterAvailable});

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(StepsEnum.condition);
  const [name, setName] = useState('');
  const [firstStepValues, setFirstStepValues] = useState<Record<string, string | Option[]>>({});

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();

    const resourceSelector = getResourceIdentifierSelector(
      firstStepValues.resourceLabelSelector || firstStepValues.resourceNameSelector,
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
