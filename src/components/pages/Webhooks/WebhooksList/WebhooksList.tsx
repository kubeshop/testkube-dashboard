import {FC, useContext} from 'react';

import {DashboardContext, MainContext, ModalContext} from '@contexts';

import {Button} from '@custom-antd';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useGetWebhooksQuery} from '@services/webhooks';

import WebhookCreationModal from '../WebhookCreationModal';

import EmptyWebhooks from './EmptyWebhooks';
import WebhookCard from './WebhookCard';

const WebhooksList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const {setModalOpen, setModalConfig} = useContext(ModalContext);

  const {data, isLoading} = useGetWebhooksQuery(null);

  const mayCreate = usePermission(Permissions.createEntity);

  const openModal = () => {
    setModalOpen(true);
    setModalConfig({
      width: 530,
      title: 'Create a notification',
      content: <WebhookCreationModal />,
    });
  };

  return (
    <PageBlueprint
      title="Notifications"
      description={
        <>Send out custom webhooks and notifications when specific events happen. Learn more about Webhooks.</>
      }
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
      <EntityGrid
        maxColumns={2}
        data={data}
        Component={WebhookCard}
        componentProps={{onClick: webhook => navigate(`/webhooks/${webhook.name}/settings`)}}
        empty={<EmptyWebhooks onButtonClick={openModal} />}
        itemHeight={125}
        loadingInitially={isLoading}
      />
    </PageBlueprint>
  );
};

export default WebhooksList;
