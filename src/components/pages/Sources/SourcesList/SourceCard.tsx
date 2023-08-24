import {FC, memo} from 'react';

import {Text} from '@custom-antd/Typography/Text';

import type {SourceWithRepository} from '@models/sources';

import {SourceContainer} from '@pages/Sources/SourcesList.styled';

import {Colors} from '@styles/Colors';

interface SourceCardProps {
  item: SourceWithRepository;
  onClick: (item: SourceWithRepository) => void;
}

export const SourceCard: FC<SourceCardProps> = memo(({item, onClick}) => (
  <SourceContainer onClick={() => onClick(item)} key={item.name}>
    <Text className="regular big">{item.name}</Text>
    <Text color={Colors.slate500}>{item.repository?.uri}</Text>
  </SourceContainer>
));
