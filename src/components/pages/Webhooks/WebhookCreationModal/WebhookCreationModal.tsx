import {FC, useContext, useState} from 'react';

import {Form, Input, Steps} from 'antd';

import {DashboardContext, ModalContext} from '@contexts';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {Option} from '@models/form';
import {Webhook, WebhookEvent} from '@models/webhook';

import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {useCreateWebhookMutation} from '@services/webhooks';

import {requiredNoText} from '@utils/form';

import {FirstStep} from './FirstStep';
import {SecondStep} from './SecondStep';

type WebhookCreationModalFormValues = {
  name: string;
  type: string;
  labels: Option[];
  events: Option[];
  uri: string;
};

enum WebhookCreationModalSteps {
  Condition,
  Action,
}

const WebhookCreationModal: FC = () => {
  const {navigate} = useContext(DashboardContext);

  const [createWebhook, {isLoading}] = useCreateWebhookMutation();
  const {closeModal} = useContext(ModalContext);

  const [step, setStep] = useState<WebhookCreationModalSteps>(WebhookCreationModalSteps.Condition);
  const [form] = Form.useForm<WebhookCreationModalFormValues>();

  const onStepChange = (nextStep: number) => {
    if (step > nextStep) {
      setStep(nextStep);

      return;
    }

    form.validateFields().then(() => {
      setStep(WebhookCreationModalSteps.Action);
    });
  };

  const onFinish = () => {
    const values: WebhookCreationModalFormValues = form.getFieldsValue(true);

    const webhook: Webhook = {
      ...values,
      labels: decomposeLabels(values.labels),
      events: values.events.map(item => item.value) as WebhookEvent[],
    };

    createWebhook(webhook).then(res => {
      if ('data' in res) {
        closeModal();
        navigate(`/webhooks/${res.data.metadata.name}/settings/general`);
      }
    });
  };

  const stepToComponent: Record<WebhookCreationModalSteps, any> = {
    [WebhookCreationModalSteps.Condition]: <FirstStep onStepChange={onStepChange} />,
    [WebhookCreationModalSteps.Action]: <SecondStep onStepChange={onStepChange} />,
  };

  return (
    <Form
      form={form}
      name="webhook-creation-modal"
      layout="vertical"
      initialValues={{type: 'Webhook', resource: 'test'}}
      onFinish={onFinish}
      disabled={isLoading}
    >
      <FullWidthSpace direction="vertical" size={20}>
        <FormItem name="name" label="Name" rules={[requiredNoText]} required>
          <Input placeholder="e.g.: container-deployment-xyz" />
        </FormItem>
        <FormItem name="type" label="Type" rules={[requiredNoText]} required>
          <Input disabled />
        </FormItem>
        <Steps
          current={step}
          items={[
            {
              title: 'Condition',
            },
            {
              title: 'Action',
            },
          ]}
        />
        {stepToComponent[step]}
      </FullWidthSpace>
    </Form>
  );
};

export default WebhookCreationModal;
