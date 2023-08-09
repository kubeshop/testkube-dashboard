import {FC, useContext, useState} from 'react';

import {Form, Input, Steps} from 'antd';

import {DashboardContext} from '@contexts';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {initializeWebhooksStore} from '@store/webhooks';

import {requiredNoText} from '@utils/form';

import {FirstStep} from './FirstStep';
import {SecondStep} from './SecondStep';

type WebhookCreationModalFormValues = {
  name: string;
  type: string;
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
    const values = form.getFieldsValue(true);

    createWebhook('/webhooks', values, navigate);
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
      initialValues={{type: 'Webhook'}}
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
