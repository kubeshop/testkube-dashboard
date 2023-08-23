import {useContext, useEffect, useState} from 'react';

import {Tabs} from 'antd';

import {ExternalLink} from '@atoms';

import {MainContext} from '@contexts';

import {Button, Modal} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {EntityGrid} from '@molecules';

import {PageBlueprint} from '@organisms';

import {Error} from '@pages';

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
  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/executors/${name}`);
  const mayCreate = usePermission(Permissions.createEntity);
  const apiEndpoint = useApiEndpoint();

  const [activeTabKey, setActiveTabKey] = useState('custom');
  const [isAddExecutorModalVisible, setAddExecutorModalVisibility] = useState(false);

  const {data: executors, isLoading, error, refetch} = useGetExecutorsQuery(null, {skip: !isClusterAvailable});

  const customExecutors = executors?.filter(executorItem => executorItem.executor.executorType === 'container') || [];

  useEffect(() => {
    safeRefetch(refetch);
  }, [apiEndpoint]);

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }

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
                maxColumns={3}
                data={customExecutors}
                Component={CustomExecutorCard}
                componentProps={{onClick: openDetails}}
                empty={<EmptyCustomExecutors onButtonClick={() => setAddExecutorModalVisibility(true)} />}
                itemHeight={66}
                loadingInitially={isLoading}
              />
            ),
          },
          {
            label: 'Official executors',
            key: 'official',
            children: (
              <EntityGrid maxColumns={3} data={executorsList} Component={ExecutorCard} componentProps={{executors}} />
            ),
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
