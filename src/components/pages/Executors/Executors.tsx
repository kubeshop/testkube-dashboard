import {useMemo, useState} from 'react';

import {Tabs} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCustomExecutors} from '@redux/reducers/executorsSlice';

import {TestRunnerIcon} from '@atoms';

import {Button, Modal, Text, Title} from '@custom-antd';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';

import Colors from '@styles/Colors';

import {PageBlueprint} from '@src/components/organisms';

import {ExecutorsGrid, ExecutorsGridItem, TabsWrapper} from './Executors.styled';
import {executorsList} from './utils';

const Executors: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState('custom');
  const [isAddExecutorModalVisible, setAddExecutorModalVisibility] = useState(false);

  const customExecutors = useAppSelector(selectCustomExecutors);

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
    return [...customExecutors, 'executor'].map(executorItem => {
      return <Button>execuot</Button>;
    });
  }, [executorsList]);
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
      <TabsWrapper activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Custom executors" key="custom">
          <ExecutorsGrid>{renderedCustomExecutorsGrid}</ExecutorsGrid>
          {isAddExecutorModalVisible ? (
            <Modal
              title="Create an executor"
              isModalVisible={isAddExecutorModalVisible}
              setIsModalVisible={setAddExecutorModalVisibility}
              footer={null}
              width={880}
              content={<div />}
            />
          ) : null}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Official executors" key="official">
          <ExecutorsGrid>{renderedExecutorsGrid}</ExecutorsGrid>
        </Tabs.TabPane>
      </TabsWrapper>
    </PageBlueprint>
  );
};

export default Executors;
