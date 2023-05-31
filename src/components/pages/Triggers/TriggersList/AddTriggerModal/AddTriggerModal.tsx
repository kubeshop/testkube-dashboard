import React, {useContext, useRef, useState} from 'react';

import {Form, Space, Steps} from 'antd';

import {DashboardContext} from '@contexts';

import {Input, Text} from '@custom-antd';

import useInViewport from '@hooks/useInViewport';

import {Option} from '@models/form';
import {ErrorNotificationConfig} from '@models/notifications';

import {NotificationContent} from '@molecules';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';

import {useCreateTriggerMutation} from '@services/triggers';

import {StyledNotificationContainer} from './AddTriggerModal.styled';
import ModalFirstStep from './ModalFirstStep';
import ModalSecondStep from './ModalSecondStep';

export enum StepsEnum {
  condition = 0,
  action = 1,
}

const AddTriggerModal: React.FC = () => {
  const {navigate} = useContext(DashboardContext);

  const [createTrigger, {isLoading}] = useCreateTriggerMutation();

  const appNamespace = useAppSelector(selectNamespace);

  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(StepsEnum.condition);
  const [name, setName] = useState('');
  const [firstStepValues, setFirstStepValues] = useState<Record<string, string | Option[]>>({});

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  const [form] = Form.useForm();

  const onFinish = () => {};

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
        <Steps current={currentStep} items={[{title: 'Condition'}, {title: 'Action'}]} />{' '}
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
