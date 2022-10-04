import {useMemo} from 'react';

import {TestRunnerIcon} from '@atoms';

import {Button, Text, Title} from '@custom-antd';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';

import Colors from '@styles/Colors';

import {PageBlueprint} from '@src/components/organisms';

import {ExecutorsGrid, ExecutorsGridItem} from './Executors.styled';
import {executorsList} from './utils';

const Executors: React.FC = () => {
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
    >
      <ExecutorsGrid>{renderedExecutorsGrid}</ExecutorsGrid>
    </PageBlueprint>
  );
};

export default Executors;
