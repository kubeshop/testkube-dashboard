import {useMemo} from 'react';

import {Space} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';

import {TestRunnerIcon} from '@atoms';

import {Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {ExecutorsGrid, ExecutorsGridItem, ExecutorsHeader, ExecutorsWrapper} from './Executors.styled';

const Executors: React.FC = () => {
  const executorsList = useAppSelector(selectExecutors);

  const renderedExecutorsGrid = useMemo(() => {
    return executorsList.map(executorItem => {
      const {name} = executorItem;

      return (
        <ExecutorsGridItem direction="vertical" size={20}>
          <Title level={3} color={Colors.slate400} className="dashboard-title regular">
            <TestRunnerIcon icon={name} />
            {name}
          </Title>
          <Text color={Colors.slate400} className="regular middle">
            {name}
          </Text>
        </ExecutorsGridItem>
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
            <a href="https://kubeshop.github.io/testkube/executor-custom" target="_blank">
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
