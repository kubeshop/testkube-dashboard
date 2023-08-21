import {FC, useContext} from 'react';

import {ExternalLink} from '@atoms';

import {DashboardContext, MainContext, ModalContext} from '@contexts';

import {Button} from '@custom-antd';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useGetWebhooksQuery} from '@services/webhooks';

import {externalLinks} from '@utils/externalLinks';
import {PollingIntervals} from '@utils/numbers';

import WebhookCreationModal from '../WebhookCreationModal';

import EmptyWebhooks from './EmptyWebhooks';
import WebhookCard from './WebhookCard';

const WebhooksList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const {setModalOpen, setModalConfig} = useContext(ModalContext);

  const {data, isLoading} = useGetWebhooksQuery(null, {pollingInterval: PollingIntervals.everyTwoSeconds});

  const mayCreate = usePermission(Permissions.createEntity);

  const openModal = () => {
    setModalOpen(true);
    setModalConfig({
      width: 530,
      title: 'Create a webhook',
      content: <WebhookCreationModal />,
    });
  };

  return (
    <PageBlueprint
      title="Webhooks"
      description={
        <>
          Send out custom webhooks when specific events happen.{' '}
          <ExternalLink href={externalLinks.notificationsAndWebhooks}>Learn more about Webhooks.</ExternalLink>
        </>
      }
      {...(mayCreate
        ? {
            headerButton: (
              <Button $customType="primary" onClick={openModal} disabled={!isClusterAvailable}>
                Create a new webhook
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
