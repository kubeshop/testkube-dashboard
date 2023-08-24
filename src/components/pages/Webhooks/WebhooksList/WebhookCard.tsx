import {FC, memo, useMemo} from 'react';

import {Text} from '@custom-antd';

import {Webhook} from '@models/webhook';

import {LabelsList} from '@molecules';
import {ItemColumn, ItemRow, StyledMetricItem} from '@molecules/EntityGrid/EntityGrid.styled';

import Colors from '@styles/Colors';

import {decodeSelector} from '@utils/selectors';

import {WebhookContainer} from './WebhooksList.styled';

interface WebhookCardProps {
  item: Webhook;
  onClick: (item: Webhook) => void;
}

const WebhookCard: FC<WebhookCardProps> = ({item, onClick}) => {
  const {name, uri, selector} = item;
  const labels = useMemo(() => decodeSelector(selector), [selector]);

  return (
    <WebhookContainer onClick={() => onClick(item)} key={name}>
      <ItemRow $flex={1}>
        <ItemColumn $isStretch>
          <Text className="regular big">{name}</Text>
        </ItemColumn>
      </ItemRow>
      <ItemRow $flex={1}>
        <ItemColumn $isStretch>
          <StyledMetricItem>
            <Text className="small" color={Colors.slate500}>
              URL
            </Text>
            <Text className="regular big" color={Colors.slate400}>
              {uri}
            </Text>
          </StyledMetricItem>
          <StyledMetricItem>
            <Text className="small" color={Colors.slate500}>
              RESOURCE
            </Text>
            <LabelsList labels={labels} />
          </StyledMetricItem>
        </ItemColumn>
      </ItemRow>
    </WebhookContainer>
  );
};

export default memo(WebhookCard);
