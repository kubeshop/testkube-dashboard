import {FC, memo} from 'react';

import {Text} from '@custom-antd/Typography/Text';

import type {Executor} from '@models/executors';

import {CustomExecutorContainer} from '@pages/Executors/ExecutorsList.styled';

import {Colors} from '@styles/Colors';

interface CustomExecutorCardProps {
  item: Executor;
  onClick: (item: Executor) => void;
}

export const CustomExecutorCard: FC<CustomExecutorCardProps> = memo(({item, onClick}) => (
  <CustomExecutorContainer onClick={() => onClick(item)} key={item.name}>
    <Text className="regular big">{item.name}</Text>
    <Text color={Colors.slate500}>{item.executor.executorType}</Text>
    <Text color={Colors.slate500}>{item.executor.image}</Text>
  </CustomExecutorContainer>
));
