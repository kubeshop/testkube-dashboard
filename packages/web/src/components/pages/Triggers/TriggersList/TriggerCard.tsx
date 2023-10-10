import {FC, memo} from 'react';

import {Text} from '@custom-antd';

import {TestTrigger} from '@models/triggers';

import {TriggerContainer} from './TriggersList.styled';

interface TriggerCardProps {
  item: TestTrigger;
  onClick: (item: TestTrigger) => void;
}

const TriggerCard: FC<TriggerCardProps> = ({item, onClick}) => (
  <TriggerContainer data-test={`triggers-list-item:${item.name}`} onClick={() => onClick(item)} key={item.name}>
    <Text className="regular big" data-test="triggers-list-item-name">
      {item.name}
    </Text>
  </TriggerContainer>
);

export default memo(TriggerCard);
