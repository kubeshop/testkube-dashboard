import {FC, useContext} from 'react';

import {Form} from 'antd';

import {ModalContext} from '@contexts';

import {ConfigurationCard, DeleteEntityModal} from '@molecules';

import {useDeleteWebhookMutation} from '@services/webhooks';

import WebhookDetailsContext from '../WebhookDetailsContext';

const Delete: FC = () => {
  const {webhookDetails} = useContext(WebhookDetailsContext);
  const {setModalConfig, setModalOpen} = useContext(ModalContext);

  const onFinish = async () => {
    setModalOpen(true);
    setModalConfig({
      width: 550,
      title: 'Delete?',
      content: (
        <DeleteEntityModal
          name={webhookDetails?.name ?? ''}
          idToDelete={webhookDetails?.name}
          defaultStackRoute="/webhooks"
          useDeleteMutation={useDeleteWebhookMutation}
          entityLabel="webhook"
        />
      ),
    });
  };

  return (
    <Form name="webhook-delete-form" onFinish={onFinish}>
      <ConfigurationCard
        title="Delete this webhook"
        description="This webhook will be permanently deleted. All your automation linked to this webhook will fail from here on and you need to adapt them manually. This action is irreversible and can not be undone."
        isWarning
        confirmLabel="Delete"
        wasTouched
      />
    </Form>
  );
};

export default Delete;
