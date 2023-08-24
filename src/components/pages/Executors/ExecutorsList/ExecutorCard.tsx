import {FC, memo} from 'react';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';

import {ExecutorIcon} from '@atoms/ExecutorIcon';
import {ExternalLink} from '@atoms/ExternalLink';

import {Button} from '@custom-antd/Button';
import {Text} from '@custom-antd/Typography/Text';
import {Title} from '@custom-antd/Typography/Title';

import type {Executor} from '@models/executors';

import {ExecutorsGridItem} from '@pages/Executors/ExecutorsList.styled';
import type {ExecutorGridItem} from '@pages/Executors/utils';

import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {Colors} from '@styles/Colors';

interface ExecutorCardProps {
  item: ExecutorGridItem;
  executors?: Executor[];
}

export const ExecutorCard: FC<ExecutorCardProps> = memo(({item, executors}) => {
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
});
