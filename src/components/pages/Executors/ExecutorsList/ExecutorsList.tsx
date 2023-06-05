import {useContext, useEffect, useState} from 'react';

import {Tabs} from 'antd';

import {ExternalLink} from '@atoms';

import {DashboardContext, MainContext} from '@contexts';

import {Button, Modal} from '@custom-antd';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useApiEndpoint} from '@services/apiEndpoint';
import {useGetExecutorsQuery} from '@services/executors';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import {executorsList} from '../utils';

import AddExecutorsModal from './AddExecutorsModal';
import CustomExecutorCard from './CustomExecutorCard';
import EmptyCustomExecutors from './EmptyCustomExecutors';
import ExecutorCard from './ExecutorCard';

const Executors: React.FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const mayCreate = usePermission(Permissions.createEntity);
  const apiEndpoint = useApiEndpoint();

  const [activeTabKey, setActiveTabKey] = useState('custom');
  const [isAddExecutorModalVisible, setAddExecutorModalVisibility] = useState(false);

  const {data: executors, isLoading, refetch} = useGetExecutorsQuery(null, {skip: !isClusterAvailable});

  const customExecutors = executors?.filter(executorItem => executorItem.executor.executorType === 'container') || [];

  useEffect(() => {
    safeRefetch(refetch);
  }, [apiEndpoint]);

  return (
    <PageBlueprint
      title="Executors"
      description={
        <>
          Executors are the type of tests which can be run by testkube. Learn more about{' '}
          <ExternalLink href={externalLinks.containerExecutor}>executors</ExternalLink>
        </>
      }
      headerButton={
        mayCreate ? (
          <Button
            $customType="primary"
            onClick={() => setAddExecutorModalVisibility(true)}
            disabled={!isClusterAvailable}
          >
            Create a new executor
          </Button>
        ) : null
      }
    >
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        destroyInactiveTabPane
        defaultActiveKey="custom"
        items={[
          {
            label: 'Custom executors',
            key: 'custom',
            children: (
              <EntityGrid
                data={customExecutors}
                Component={CustomExecutorCard}
                componentProps={{onClick: executor => navigate(`/executors/${executor.name}`)}}
                empty={<EmptyCustomExecutors onButtonClick={() => setAddExecutorModalVisibility(true)} />}
                itemHeight={66}
                loadingInitially={isLoading}
              />
            ),
          },
          {
            label: 'Official executors',
            key: 'official',
            children: <EntityGrid data={executorsList} Component={ExecutorCard} componentProps={{executors}} />,
          },
        ]}
      />
      {isAddExecutorModalVisible ? (
        <Modal
          title="Create an executor"
          isModalVisible={isAddExecutorModalVisible}
          setIsModalVisible={setAddExecutorModalVisibility}
          width={880}
          content={<AddExecutorsModal />}
        />
      ) : null}
    </PageBlueprint>
  );
};

export default Executors;
