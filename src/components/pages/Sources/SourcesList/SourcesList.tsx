import {useContext, useEffect, useState} from 'react';

import {ExternalLink} from '@atoms';

import {DashboardContext, MainContext} from '@contexts';

import {Button, Modal} from '@custom-antd';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectSources, setSources} from '@redux/reducers/sourcesSlice';

import {useGetSourcesQuery} from '@services/sources';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import AddSourceModal from './AddSourceModal';
import EmptySources from './EmptySources';
import SourceCard from './SourceCard';

const Sources: React.FC = () => {
  const sourcesList = useAppSelector(selectSources);

  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);

  const {data: sources, refetch, isLoading} = useGetSourcesQuery(null, {skip: !isClusterAvailable});

  const [isAddSourceModalVisible, setAddSourceModalVisibility] = useState(false);
  const mayCreate = usePermission(Permissions.createEntity);

  useEffect(() => {
    if (sources) {
      dispatch(setSources(sources));
    }
  }, [sources]);

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
        data={sourcesList}
        Component={SourceCard}
        componentProps={{onClick: source => navigate(`/sources/${source.name}`)}}
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
