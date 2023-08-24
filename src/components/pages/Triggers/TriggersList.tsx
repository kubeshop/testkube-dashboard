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

import {useGetTriggersListQuery} from '@services/triggers';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import {AddTriggerModal} from './TriggersList/AddTriggerModal';
import {EmptyTriggers} from './TriggersList/EmptyTriggers';
import {TriggerCard} from './TriggersList/TriggerCard';

export const TriggersList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {location} = useContext(DashboardContext);
  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/triggers/${name}`);

  const {data: triggers, refetch, error, isLoading} = useGetTriggersListQuery(null, {skip: !isClusterAvailable});

  const [isAddTriggerModalVisible, setAddTriggerModalVisibility] = useState(false);
  const mayCreate = usePermission(Permissions.createEntity);

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
        data={triggers}
        Component={TriggerCard}
        componentProps={{onClick: openDetails}}
        empty={<EmptyTriggers onButtonClick={() => setAddTriggerModalVisibility(true)} />}
        itemHeight={66}
        loadingInitially={isLoading || !isClusterAvailable}
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
