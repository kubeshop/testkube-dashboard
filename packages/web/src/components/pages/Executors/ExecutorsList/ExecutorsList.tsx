import {useEffect, useState} from 'react';

import {Tabs} from 'antd';

import {ExternalLink} from '@atoms';

import {Button} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

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
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);
  const openDetails = useDashboardNavigate(({name}: {name: string}) => `/executors/${name}`);
  const mayCreate = usePermission(Permissions.createEntity);
  const apiEndpoint = useApiEndpoint();

  const [activeTabKey, setActiveTabKey] = useState('custom');

  const {data: executors, isLoading, error, refetch} = useGetExecutorsQuery(null, {skip: !isClusterAvailable});

  const {open: openCreateModal} = useModal({
    title: 'Create an executor',
    width: 880,
    content: <AddExecutorsModal />,
    dataTestCloseBtn: 'add-a-new-executor-modal-close-button',
    dataTestModalRoot: 'add-a-new-executor-modal',
  });

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
          <Button $customType="primary" onClick={openCreateModal} disabled={!isClusterAvailable}>
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
                empty={<EmptyCustomExecutors onButtonClick={openCreateModal} />}
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
    </PageBlueprint>
  );
};

export default Executors;
