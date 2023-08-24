import {FC, memo} from 'react';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';

import {Tag} from '@atoms';

import {Text} from '@custom-antd';

import {Webhook} from '@models/webhook';

import {LabelsList} from '@molecules';
import {ItemColumn, ItemRow, StyledMetricItem} from '@molecules/EntityGrid/EntityGrid.styled';

import Colors from '@styles/Colors';

import {WebhookContainer} from './WebhooksList.styled';

interface WebhookCardProps {
  item: Webhook;
  onClick: (item: Webhook) => void;
}

const WebhookCard: FC<WebhookCardProps> = ({item, onClick}) => {
  const {name, uri, labels = {}} = item;

  return (
    <WebhookContainer onClick={() => onClick(item)} key={name}>
      <ItemRow $flex={1}>
        <ItemColumn $isStretch>
          <Text className="regular big">{name}</Text>
          <Tag title="Webhook" type="info" icon={<TestSuitesIcon />} />
        </ItemColumn>
      </ItemRow>
      <ItemRow $flex={1}>
        <ItemColumn $isStretch>
          <StyledMetricItem>
            <Text className="small uppercase" color={Colors.slate500}>
              url
            </Text>
            <Text className="regular big" color={Colors.slate400}>
              {uri}
            </Text>
          </StyledMetricItem>
          <StyledMetricItem>
            <Text className="small uppercase" color={Colors.slate500}>
              resources
            </Text>
            <LabelsList labels={labels} />
          </StyledMetricItem>
        </ItemColumn>
      </ItemRow>
    </WebhookContainer>
  );
};

export default memo(WebhookCard);
