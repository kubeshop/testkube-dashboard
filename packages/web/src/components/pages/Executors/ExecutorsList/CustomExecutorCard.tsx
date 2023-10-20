import {FC, memo} from 'react';

import {Text} from '@custom-antd';

import {Executor} from '@models/executors';

import Colors from '@styles/Colors';

import {CustomExecutorContainer} from './ExecutorsList.styled';

interface CustomExecutorCardProps {
  item: Executor;
  onClick: (item: Executor) => void;
}

const CustomExecutorCard: FC<CustomExecutorCardProps> = ({item, onClick}) => (
  <CustomExecutorContainer onClick={() => onClick(item)} key={item.name} data-test={item.name}>
    <Text className="regular big">{item.name}</Text>
    <Text color={Colors.slate500}>{item.executor.executorType}</Text>
    <Text color={Colors.slate500}>{item.executor.image}</Text>
  </CustomExecutorContainer>
);

export default memo(CustomExecutorCard);
