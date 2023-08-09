import {useContext, useEffect, useState} from 'react';

import {ExternalLink} from '@atoms';

import {DashboardContext, MainContext} from '@contexts';

import {Button, Modal} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useGetTriggersListQuery} from '@services/triggers';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import AddTriggerModal from './AddTriggerModal';
import EmptyTriggers from './EmptyTriggers';
import TriggerCard from './TriggerCard';

const TriggersList: React.FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {location} = useContext(DashboardContext);
  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/triggers/${name}`);

  const {data: triggersList = [], refetch, isLoading} = useGetTriggersListQuery(null, {skip: !isClusterAvailable});

  const [isAddTriggerModalVisible, setAddTriggerModalVisibility] = useState(false);
  const mayCreate = usePermission(Permissions.createEntity);

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

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
            $customType="primary"
            onClick={() => setAddTriggerModalVisibility(true)}
            disabled={!isClusterAvailable}
          >
            Create a new trigger
          </Button>
        ) : null
      }
    >
      <EntityGrid
        maxColumns={3}
        data={triggersList}
        Component={TriggerCard}
        componentProps={{onClick: openDetails}}
        empty={<EmptyTriggers onButtonClick={() => setAddTriggerModalVisibility(true)} />}
        itemHeight={66}
        loadingInitially={isLoading}
      />
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

export default TriggersList;
