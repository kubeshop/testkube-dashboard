import {FC, memo, useMemo} from 'react';

import {Text} from '@custom-antd';

import {Webhook} from '@models/webhook';

import {LabelSelectorHelpIcon, LabelsList} from '@molecules';
import {ItemColumn, ItemRow, StyledMetricItem} from '@molecules/EntityGrid/EntityGrid.styled';

import {decodeWebhookSelector} from '@src/utils/webhooks';

import Colors from '@styles/Colors';

import {WebhookContainer} from './WebhooksList.styled';

interface WebhookCardProps {
  item: Webhook;
  onClick: (item: Webhook) => void;
}

const WebhookCard: FC<WebhookCardProps> = ({item, onClick}) => {
  const {name, uri, selector} = item;
  const labels = useMemo(() => {
    return decodeWebhookSelector(selector).map(x => {
      const labelPair = x.split(':');
      return {
        label: labelPair[0],
        value: labelPair[1],
      };
    });
  }, [selector]);

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
              RESOURCE <LabelSelectorHelpIcon />
            </Text>
            {selector ? <LabelsList labels={labels} shouldSkipLabels /> : <Text className="small">All resources</Text>}
          </StyledMetricItem>
        </ItemColumn>
      </ItemRow>
    </WebhookContainer>
  );
};

export default memo(WebhookCard);
