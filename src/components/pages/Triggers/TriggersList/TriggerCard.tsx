import {FC, memo} from 'react';

import {Text} from '@custom-antd/Typography/Text';

import type {TestTrigger} from '@models/triggers';

import {TriggerContainer} from '@pages/Triggers/TriggersList.styled';

interface TriggerCardProps {
  item: TestTrigger;
  onClick: (item: TestTrigger) => void;
}

export const TriggerCard: FC<TriggerCardProps> = memo(({item, onClick}) => (
  <TriggerContainer onClick={() => onClick(item)} key={item.name}>
    <Text className="regular big">{item.name}</Text>
  </TriggerContainer>
));
