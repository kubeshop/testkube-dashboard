import {FC, memo, useMemo} from 'react';

import {Text} from '@custom-antd';

import {Webhook} from '@models/webhook';

import {LabelSelectorHelpIcon, LabelsList} from '@molecules';
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
    <WebhookContainer data-test={`webhooks-list-item:${name}`} onClick={() => onClick(item)} key={name}>
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
            <Text className="regular big" color={Colors.slate400} data-test="webhooks-list-item-url">
              {uri}
            </Text>
          </StyledMetricItem>
          <StyledMetricItem>
            <Text className="small" color={Colors.slate500}>
              RESOURCE <LabelSelectorHelpIcon />
            </Text>
            <div data-test="webhooks-list-item-selector">
              {selector ? <LabelsList labels={labels} /> : <Text className="small">All resources</Text>}
            </div>
          </StyledMetricItem>
        </ItemColumn>
      </ItemRow>
    </WebhookContainer>
  );
};

export default memo(WebhookCard);
