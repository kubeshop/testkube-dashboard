import {FC, useContext, useEffect, useState} from 'react';

import {ExternalLink} from '@atoms/ExternalLink';

import {DashboardContext} from '@contexts/DashboardContext';
import {MainContext} from '@contexts/MainContext';

import {Button} from '@custom-antd/Button';
import {CustomModal as Modal} from '@custom-antd/Modal';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {EntityGrid} from '@molecules/EntityGrid';

import {PageBlueprint} from '@organisms/PageBlueprint';

import {Error} from '@pages/Error';

import {Permissions, usePermission} from '@permissions/base';

import {useGetSourcesQuery} from '@services/sources';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import {AddSourceModal} from './SourcesList/AddSourceModal';
import {EmptySources} from './SourcesList/EmptySources';
import {SourceCard} from './SourcesList/SourceCard';

export const Sources: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {location} = useContext(DashboardContext);
  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/sources/${name}`);

  const {data: sources, refetch, error, isLoading} = useGetSourcesQuery(null, {skip: !isClusterAvailable});

  const [isAddSourceModalVisible, setAddSourceModalVisibility] = useState(false);
  const mayCreate = usePermission(Permissions.createEntity);

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
        loadingInitially={isLoading || !isClusterAvailable}
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
