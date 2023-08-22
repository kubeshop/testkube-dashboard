import {useContext, useEffect, useState} from 'react';

import {ExternalLink} from '@atoms';

import {DashboardContext, MainContext} from '@contexts';

import {Button, Modal} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useGetSourcesQuery} from '@services/sources';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import AddSourceModal from './AddSourceModal';
import EmptySources from './EmptySources';
import SourceCard from './SourceCard';

const Sources: React.FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {location} = useContext(DashboardContext);
  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/sources/${name}`);

  const {data: sources, refetch, isLoading} = useGetSourcesQuery(null, {skip: !isClusterAvailable});

  const [isAddSourceModalVisible, setAddSourceModalVisibility] = useState(false);
  const mayCreate = usePermission(Permissions.createEntity);

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

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
          <Button
            $customType="primary"
            onClick={() => setAddSourceModalVisibility(true)}
            disabled={!isClusterAvailable}
          >
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
        empty={<EmptySources onButtonClick={() => setAddSourceModalVisibility(true)} />}
        itemHeight={66}
        loadingInitially={isLoading}
      />
      {isAddSourceModalVisible ? (
        <Modal
          title="Create a new source"
          isModalVisible={isAddSourceModalVisible}
          setIsModalVisible={setAddSourceModalVisibility}
          width={880}
          content={<AddSourceModal />}
        />
      ) : null}
    </PageBlueprint>
  );
};

export default Sources;
