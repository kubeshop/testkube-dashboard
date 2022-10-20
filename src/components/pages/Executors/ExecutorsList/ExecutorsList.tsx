import {useContext, useEffect, useMemo, useState} from 'react';

import {Tabs} from 'antd';

import {TestRunnerIcon} from '@atoms';

import {Button, Modal, Text, Title} from '@custom-antd';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';

import {useGetExecutorsQuery} from '@services/executors';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {PageBlueprint} from '@src/components/organisms';

import {executorsList} from '../utils';
import AddExecutorsModal from './AddExecutorsModal';
import {CustomExecutorContainer, ExecutorsGrid, ExecutorsGridItem} from './ExecutorsList.styled';

const Executors: React.FC = () => {
  const {navigate} = useContext(MainContext);
  const [activeTabKey, setActiveTabKey] = useState('custom');
  const [isAddExecutorModalVisible, setAddExecutorModalVisibility] = useState(false);

  const {data: executors, isLoading, refetch} = useGetExecutorsQuery();
  const customExecutors = executors?.filter(executorItem => executorItem.executor.executorType === 'container') || [];

  const onNavigateToDetails = (name: string) => {
    navigate(`executors/${name}`);
  };

  useEffect(() => {
    if (customExecutors.length <= 0 && !isLoading) {
      setActiveTabKey('official');
    }
  }, [customExecutors, isLoading]);

  useEffect(() => {
    refetch();
  }, []);

  const renderedExecutorsGrid = useMemo(() => {
    return executorsList.map(executorItem => {
      const {type, title, description, docLink} = executorItem;

      const isExecutor = type !== 'custom';

      return (
        <a href={docLink} target="_blank" key={docLink}>
          <ExecutorsGridItem className={isExecutor ? 'executor' : 'custom-executor'} direction="vertical" size={20}>
            <Title level={3} color={Colors.slate400} className="dashboard-title regular">
              {isExecutor ? <TestRunnerIcon icon={type} /> : <ExecutorsIcon />}
              {title}
            </Title>
            <Text color={Colors.slate400} className="regular middle">
              {description}
            </Text>
            <Button $customType="secondary">Learn more</Button>
          </ExecutorsGridItem>
        </a>
      );
    });
  }, [executorsList]);

  const renderedCustomExecutorsGrid = useMemo(() => {
    return customExecutors.map(executorItem => {
      return (
        <CustomExecutorContainer onClick={() => onNavigateToDetails(executorItem.name)} key={executorItem.name}>
          <Text className="regular big">{executorItem.name}</Text>
          <Text className="regular small" color={Colors.slate500}>
            {executorItem.executor.executorType}
          </Text>
          <Text className="regular small" color={Colors.slate500}>
            {executorItem.executor.image}
          </Text>
        </CustomExecutorContainer>
      );
    });
  }, [customExecutors]);

  return (
    <PageBlueprint
      title="Executors"
      description={
        <>
          Executors are the type of tests which can be run by testkube. Learn more about{' '}
          <a href="https://kubeshop.github.io/testkube/test-types/executor-custom" target="_blank">
            executors
          </a>
        </>
      }
      headerButton={
        <Button $customType="primary" onClick={() => setAddExecutorModalVisibility(true)}>
          Create a new executor
        </Button>
      }
    >
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        {customExecutors.length > 0 ? (
          <Tabs.TabPane tab="Custom executors" key="custom">
            <ExecutorsGrid>{renderedCustomExecutorsGrid}</ExecutorsGrid>
          </Tabs.TabPane>
        ) : null}
        <Tabs.TabPane tab="Official executors" key="official">
          <ExecutorsGrid>{renderedExecutorsGrid}</ExecutorsGrid>
        </Tabs.TabPane>
      </Tabs>
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
