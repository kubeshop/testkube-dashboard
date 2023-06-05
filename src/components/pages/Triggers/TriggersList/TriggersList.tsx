import {useContext, useEffect, useMemo, useState} from 'react';

import {ExternalLink} from '@atoms';

import {DashboardContext, MainContext} from '@contexts';

import {Button, Modal, Skeleton, Text} from '@custom-antd';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useGetTriggersListQuery} from '@services/triggers';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import AddTriggerModal from './AddTriggerModal';
import EmptyTriggers from './EmptyTriggers';
import {StyledTriggersGrid, StyledTriggersSkeletonWrapper, TriggerContainer} from './TriggersList.styled';

const Triggers: React.FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);

  const {data: triggersList = [], refetch, isLoading} = useGetTriggersListQuery(null, {skip: !isClusterAvailable});

  const [isAddTriggerModalVisible, setAddTriggerModalVisibility] = useState(false);
  const mayCreate = usePermission(Permissions.createEntity);

  const onNavigateToDetails = (name: string) => {
    navigate(`/triggers/${name}`);
  };

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

  const renderedTriggersGrid = useMemo(() => {
    return triggersList.map(triggerItem => {
      return (
        <TriggerContainer onClick={() => onNavigateToDetails(triggerItem.name)} key={triggerItem.name}>
          <Text className="regular big">{triggerItem.name}</Text>
        </TriggerContainer>
      );
    });
  }, [triggersList]);

  return (
    <PageBlueprint
      title="Triggers"
      description={
        <>
          Listen for events and run specific testkube actions. Learn more about{' '}
          <ExternalLink href={externalLinks.testTriggers}>Triggers</ExternalLink>
        </>
      }
      headerButton={
        mayCreate ? (
          <Button
            $customType="primary"
            onClick={() => setAddTriggerModalVisibility(true)}
            disabled={!isClusterAvailable}
          >
            Create a new trigger
          </Button>
        ) : null
      }
    >
      {isLoading ? (
        <StyledTriggersSkeletonWrapper>
          {new Array(6).fill(0).map((_, index) => {
            const key = `skeleton-item-${index}`;

            return <Skeleton additionalStyles={{lineHeight: 120}} key={key} />;
          })}
        </StyledTriggersSkeletonWrapper>
      ) : renderedTriggersGrid?.length ? (
        <StyledTriggersGrid>{renderedTriggersGrid}</StyledTriggersGrid>
      ) : (
        <EmptyTriggers
          onButtonClick={() => {
            setAddTriggerModalVisibility(true);
          }}
        />
      )}
      {isAddTriggerModalVisible ? (
        <Modal
          title="Create a new trigger"
          isModalVisible={isAddTriggerModalVisible}
          setIsModalVisible={setAddTriggerModalVisibility}
          width={546}
          content={<AddTriggerModal />}
        />
      ) : null}
    </PageBlueprint>
  );
};

export default Triggers;
