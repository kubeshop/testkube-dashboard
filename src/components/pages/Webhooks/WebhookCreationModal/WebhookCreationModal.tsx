import {FC, useState} from 'react';

import {Form, Input, Steps} from 'antd';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {useModal} from '@modal/hooks';

import {Option} from '@models/form';
import {Webhook, WebhookEvent} from '@models/webhook';

import {notificationCall} from '@molecules';

import {useCreateWebhookMutation} from '@services/webhooks';

import {requiredNoText} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {FirstStep} from './FirstStep';
import {SecondStep} from './SecondStep';

type WebhookCreationModalFormValues = {
  name: string;
  selector: Option[];
  events: Option[];
  uri: string;
};

enum WebhookCreationModalSteps {
  Condition,
  Action,
}

const WebhookCreationModal: FC = () => {
  const openDetails = useDashboardNavigate(name => `/webhooks/${name}/settings/general`);
  const [createWebhook, {isLoading}] = useCreateWebhookMutation();
  const {close} = useModal();

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
    const selector = values.selector?.map(x => `${x.value}`.replace(':', '=')).join(',') || '';

    const webhook: Webhook = {
      ...values,
      selector,
      events: (values.events?.map(item => item.value) as WebhookEvent[]) || [],
    };

    return createWebhook(webhook)
      .then(displayDefaultNotificationFlow)
      .then(res => {
        close();
        openDetails(res.data.metadata.name);
      })
      .catch(error => notificationCall('failed', error.title, error.message));
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
