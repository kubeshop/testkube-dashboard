import {FC, useContext, useState} from 'react';

import {Form, Input, Steps} from 'antd';

import {DashboardContext} from '@contexts';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {Option} from '@models/form';
import {Webhook, WebhookEvent} from '@models/webhook';

import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {initializeWebhooksStore} from '@store/webhooks';

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
  const {location, navigate} = useContext(DashboardContext);

  const [step, setStep] = useState<WebhookCreationModalSteps>(WebhookCreationModalSteps.Condition);
  const [form] = Form.useForm<WebhookCreationModalFormValues>();

  const [, {pick: useWebhooksPick}] = initializeWebhooksStore();
  const {createWebhook} = useWebhooksPick('createWebhook');

  const onStepChange = (nextStep: number) => {
    if (step > nextStep) {
      setStep(nextStep);

      return;
    }

    form.validateFields().then(() => {
      setStep(WebhookCreationModalSteps.Action);
    });
  };

  const onFinish = async () => {
    const values: WebhookCreationModalFormValues = form.getFieldsValue(true);

    const webhook: Webhook = {
      //   {
      //     "type": "Webhook",
      //     "resource": "test",
      //     "name": "nameqweqwe",
      //     "labels": {
      //         "asdf": "asdf"
      //     },
      //     "events": [
      //         "start-test"
      //     ],
      //     "uri": "https://asdasd.co"
      // }

      ...values,
      labels: decomposeLabels(values.labels),
      events: values.events.map(item => item.value) as WebhookEvent[],
    };

    createWebhook('/webhooks', webhook, navigate);
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
