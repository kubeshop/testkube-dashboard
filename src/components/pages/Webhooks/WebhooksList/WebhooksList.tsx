import {FC, useContext} from 'react';

import {ExternalLink} from '@atoms';

import {MainContext, ModalContext} from '@contexts';

import {Button} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useLastCallback} from '@hooks/useLastCallback';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Error} from '@pages';

import {Permissions, usePermission} from '@permissions/base';

import {useGetWebhooksQuery} from '@services/webhooks';

import {externalLinks} from '@utils/externalLinks';
import {PollingIntervals} from '@utils/numbers';

import WebhookCreationModal from '../WebhookCreationModal';

import EmptyWebhooks from './EmptyWebhooks';
import WebhookCard from './WebhookCard';

const WebhooksList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {setModalOpen, setModalConfig} = useContext(ModalContext);

  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/webhooks/${name}/settings`);

  const {
    data: webhooks,
    error,
    isLoading,
  } = useGetWebhooksQuery(null, {pollingInterval: PollingIntervals.everyTwoSeconds});

  const mayCreate = usePermission(Permissions.createEntity);

  const openModal = useLastCallback(() => {
    setModalOpen(true);
    setModalConfig({
      width: 530,
      title: 'Create a webhook',
      content: <WebhookCreationModal />,
    });
  });

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }

  return (
    <PageBlueprint
      title="Webhooks"
      description={
        <>
          Send out custom webhooks when specific events happen.{' '}
          <ExternalLink href={externalLinks.notificationsAndWebhooks}>Learn more about Webhooks.</ExternalLink>
        </>
      }
      headerButton={
        mayCreate ? (
          <Button $customType="primary" onClick={openModal} disabled={!isClusterAvailable}>
            Create a new webhook
          </Button>
        ) : null
      }
    >
      <EntityGrid
        maxColumns={2}
        data={webhooks}
        Component={WebhookCard}
        componentProps={{onClick: openDetails}}
        empty={<EmptyWebhooks onButtonClick={openModal} />}
        itemHeight={125}
        loadingInitially={isLoading || !isClusterAvailable}
      />
    </PageBlueprint>
  );
};

export default WebhooksList;
