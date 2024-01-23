import {FC} from 'react';

import {ExternalLink} from '@atoms';

import {Button} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

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
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/webhooks/${name}/settings`);

  const {
    data: webhooks,
    error,
    isLoading,
  } = useGetWebhooksQuery(null, {pollingInterval: PollingIntervals.everyTwoSeconds, skip: !isClusterAvailable});

  const mayCreate = usePermission(Permissions.createEntity);

  const {open: openCreateModal} = useModal({
    title: 'Create a webhook',
    width: 530,
    content: <WebhookCreationModal />,
    dataTestCloseBtn: 'add-a-new-webhook-modal-close-button',
    dataTestModalRoot: 'add-a-new-webhook-modal',
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
          <Button
            data-test="webhooks-add-button"
            $customType="primary"
            onClick={openCreateModal}
            disabled={!isClusterAvailable}
          >
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
        empty={<EmptyWebhooks onButtonClick={openCreateModal} />}
        itemHeight={125}
        loadingInitially={isLoading}
      />
    </PageBlueprint>
  );
};

export default WebhooksList;
