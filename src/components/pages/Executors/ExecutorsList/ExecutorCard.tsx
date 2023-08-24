import {FC, memo} from 'react';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';

import {ExecutorIcon, ExternalLink} from '@atoms';

import {Button, Text, Title} from '@custom-antd';

import {Executor} from '@models/executors';

import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import Colors from '@styles/Colors';

import {ExecutorGridItem} from '../utils';

import {ExecutorsGridItem} from './ExecutorsList.styled';

interface ExecutorCardProps {
  item: ExecutorGridItem;
  executors?: Executor[];
}

const ExecutorCard: FC<ExecutorCardProps> = ({item, executors}) => {
  const isExecutor = item.type !== 'custom';
  const executorIcon = getTestExecutorIcon(executors || [], item.type);

  return (
    <ExternalLink href={item.docLink} key={item.docLink}>
      <ExecutorsGridItem className={isExecutor ? 'executor' : 'custom-executor'} direction="vertical" size={10}>
        <Title level={3} color={Colors.slate400} className="dashboard-title regular">
          {isExecutor ? <ExecutorIcon type={executorIcon} /> : <ExecutorsIcon />}
          {item.title}
        </Title>
        <Text color={Colors.slate400} className="regular middle">
          {item.description}
        </Text>
        <Button $customType="secondary">Learn more</Button>
      </ExecutorsGridItem>
    </ExternalLink>
  );
};

export default memo(ExecutorCard);
