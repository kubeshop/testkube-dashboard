import {useContext, useEffect, useMemo, useState} from 'react';

import {useAppSelector} from '@redux/hooks';
import {selectSources, setSources} from '@redux/reducers/sourcesSlice';

import {ExternalLink} from '@atoms';

import {Button, Modal, Skeleton, Text} from '@custom-antd';

import {PageBlueprint} from '@organisms';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import {useGetSourcesQuery} from '@services/sources';

import Colors from '@styles/Colors';

import {Permissions, usePermission} from '@permissions/base';

import {DashboardContext, MainContext} from '@contexts';

import AddSourceModal from './AddSourceModal';
import EmptySources from './EmptySources';
import {SourceContainer, SourcesGrid, SourcesListSkeletonWrapper} from './SourcesList.styled';

const Sources: React.FC = () => {
  const sourcesList = useAppSelector(selectSources);

  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);

  const {data: sources, refetch, isLoading} = useGetSourcesQuery(null, {skip: !isClusterAvailable});

  const [isAddSourceModalVisible, setAddSourceModalVisibility] = useState(false);
  const mayCreate = usePermission(Permissions.createEntity);

  const onNavigateToDetails = (name: string) => {
    navigate(`/sources/${name}`);
  };

  useEffect(() => {
    if (sources) {
      dispatch(setSources(sources));
    }
  }, [sources]);

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

  const renderedSourcesGrid = useMemo(() => {
    return sourcesList.map(sourceItem => {
      return (
        <SourceContainer onClick={() => onNavigateToDetails(sourceItem.name)} key={sourceItem.name}>
          <Text className="regular big">{sourceItem.name}</Text>
          <Text color={Colors.slate500}>{sourceItem.repository?.uri}</Text>
        </SourceContainer>
      );
    });
  }, [sourcesList]);

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
      {isLoading ? (
        <SourcesListSkeletonWrapper>
          {new Array(6).fill(0).map((_, index) => {
            const key = `skeleton-item-${index}`;

            return <Skeleton additionalStyles={{lineHeight: 80}} key={key} />;
          })}
        </SourcesListSkeletonWrapper>
      ) : renderedSourcesGrid && renderedSourcesGrid.length ? (
        <SourcesGrid>{renderedSourcesGrid}</SourcesGrid>
      ) : (
        <EmptySources
          onButtonClick={() => {
            setAddSourceModalVisibility(true);
          }}
        />
      )}
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
