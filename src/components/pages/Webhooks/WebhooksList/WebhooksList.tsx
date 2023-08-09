import {FC, useContext, useEffect} from 'react';

import {DashboardContext, MainContext, ModalContext} from '@contexts';

import {Button} from '@custom-antd';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {initializeWebhooksStore} from '@store/webhooks';

import WebhookCreationModal from '../WebhookCreationModal';

const WebhooksList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);
  const {setModalOpen, setModalConfig} = useContext(ModalContext);

  const [, {pick: useWebhooksPick}] = initializeWebhooksStore();
  const {getWebhooks} = useWebhooksPick('getWebhooks');
  const {webhooks} = useWebhooksPick('webhooks');

  const mayCreate = usePermission(Permissions.createEntity);

  const openModal = () => {
    setModalOpen(true);
    setModalConfig({
      width: 530,
      title: 'Create a notification',
      content: <WebhookCreationModal />,
    });
  };

  useEffect(() => {
    getWebhooks('/webhooks');
  }, [location]);

  return (
    <PageBlueprint
      title="Webhooks"
      description="Send out custom webhooks and notifications when specific events happen. Learn more about Webhooks."
      {...(mayCreate
        ? {
            headerButton: (
              <Button $customType="primary" onClick={openModal} disabled={!isClusterAvailable}>
                Create a new notification
              </Button>
            ),
          }
        : null)}
    >
      {/* {} */}
    </PageBlueprint>
  );
};

export default WebhooksList;
