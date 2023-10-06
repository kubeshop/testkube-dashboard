import {useContext, useEffect} from 'react';

import {ExternalLink} from '@atoms';

import {DashboardContext} from '@contexts';

import {Button} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Error} from '@pages';

import {Permissions, usePermission} from '@permissions/base';

import {useGetTriggersListQuery} from '@services/triggers';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import AddTriggerModal from './AddTriggerModal';
import EmptyTriggers from './EmptyTriggers';
import TriggerCard from './TriggerCard';

const TriggersList: React.FC = () => {
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);
  const {location} = useContext(DashboardContext);
  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/triggers/${name}`);

  const {data: triggers, refetch, error, isLoading} = useGetTriggersListQuery(null, {skip: !isClusterAvailable});

  const mayCreate = usePermission(Permissions.createEntity);

  const {open: openCreateModal} = useModal({
    title: 'Create a new trigger',
    width: 546,
    content: <AddTriggerModal />,
    dataTestCloseBtn: 'add-a-new-trigger-modal-close-button',
    dataTestModalRoot: 'add-a-new-trigger-modal',
  });

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }

  return (
    <PageBlueprint
      title="Triggers"
      description={
        <>
          Listen for events and run specific Testkube actions. Learn more about{' '}
          <ExternalLink href={externalLinks.testTriggers}>Triggers</ExternalLink>
        </>
      }
      headerButton={
        mayCreate ? (
          <Button
            data-test="triggers-add-button"
            $customType="primary"
            onClick={openCreateModal}
            disabled={!isClusterAvailable}
          >
            Create a new trigger
          </Button>
        ) : null
      }
    >
      <EntityGrid
        maxColumns={3}
        data={triggers}
        Component={TriggerCard}
        componentProps={{onClick: openDetails}}
        empty={<EmptyTriggers onButtonClick={openCreateModal} />}
        itemHeight={66}
        loadingInitially={isLoading || !isClusterAvailable}
      />
    </PageBlueprint>
  );
};

export default TriggersList;
