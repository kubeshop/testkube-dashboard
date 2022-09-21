import {useMemo} from 'react';

import {Space} from 'antd';

import {TestRunnerIcon} from '@atoms';

import {Button, Text, Title} from '@custom-antd';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';

import Colors from '@styles/Colors';

import {ExecutorsGrid, ExecutorsGridItem, ExecutorsHeader, ExecutorsWrapper} from './Executors.styled';
import {executorsList} from './utils';

const Executors: React.FC = () => {
  const renderedExecutorsGrid = useMemo(() => {
    return executorsList.map(executorItem => {
      const {type, title, description, docLink} = executorItem;

      const isExecutor = type !== 'custom';

      return (
        <a href={docLink} target="_blank">
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

  return (
    <ExecutorsWrapper>
      <ExecutorsHeader>
        <Space size={15} direction="vertical">
          <Title color={Colors.slate50} ellipsis>
            Executors
          </Title>
          <Text className="regular middle" color={Colors.slate400}>
            Executors are the type of tests which can be run by testkube. Learn more about{' '}
            <a href="https://kubeshop.github.io/testkube/test-types/executor-custom" target="_blank">
              executors
            </a>
          </Text>
        </Space>
      </ExecutorsHeader>
      <ExecutorsGrid>{renderedExecutorsGrid}</ExecutorsGrid>
    </ExecutorsWrapper>
  );
};

export default Executors;
