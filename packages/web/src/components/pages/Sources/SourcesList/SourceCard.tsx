import {FC, memo} from 'react';

import {Text} from '@custom-antd';

import {SourceWithRepository} from '@models/sources';

import Colors from '@styles/Colors';

import {SourceContainer} from './SourcesList.styled';

interface SourceCardProps {
  item: SourceWithRepository;
  onClick: (item: SourceWithRepository) => void;
}

const SourceCard: FC<SourceCardProps> = ({item, onClick}) => (
  <SourceContainer onClick={() => onClick(item)} key={item.name}>
    <Text className="regular big">{item.name}</Text>
    <Text color={Colors.slate500}>{item.repository?.uri}</Text>
  </SourceContainer>
);

export default memo(SourceCard);
