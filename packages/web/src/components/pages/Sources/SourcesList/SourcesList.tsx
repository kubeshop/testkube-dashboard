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

import {useGetSourcesQuery} from '@services/sources';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import AddSourceModal from './AddSourceModal';
import EmptySources from './EmptySources';
import SourceCard from './SourceCard';

const Sources: React.FC = () => {
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);
  const {location} = useContext(DashboardContext);
  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/sources/${name}`);

  const {data: sources, refetch, error, isLoading} = useGetSourcesQuery(null, {skip: !isClusterAvailable});

  const mayCreate = usePermission(Permissions.createEntity);

  const {open: openCreateModal} = useModal({
    title: 'Create a new source',
    width: 880,
    content: <AddSourceModal />,
    dataTestCloseBtn: 'add-a-new-test-source-modal-close-button',
    dataTestModalRoot: 'add-a-new-test-source-modal',
  });

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }

  return (
    <PageBlueprint
      title="Sources"
      description={
        <>
          Define global sources you can refer to in your tests. Learn more about{' '}
          <ExternalLink href={externalLinks.testSources}>Sources</ExternalLink>
        </>
      }
      headerButton={
        mayCreate ? (
          <Button $customType="primary" onClick={openCreateModal} disabled={!isClusterAvailable}>
            Create a new source
          </Button>
        ) : null
      }
    >
      <EntityGrid
        maxColumns={2}
        data={sources!}
        Component={SourceCard}
        componentProps={{onClick: openDetails}}
        empty={<EmptySources onButtonClick={openCreateModal} />}
        itemHeight={66}
        loadingInitially={isLoading || !isClusterAvailable}
      />
    </PageBlueprint>
  );
};

export default Sources;
