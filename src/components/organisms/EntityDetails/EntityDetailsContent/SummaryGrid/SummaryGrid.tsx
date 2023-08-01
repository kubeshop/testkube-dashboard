import React from 'react';

import {Title} from '@custom-antd';

import {Metrics} from '@models/metrics';

import Colors from '@styles/Colors';

import {formatDuration} from '@utils/formatDate';

import {CustomText, SummaryGridItem, SummaryGridWrapper} from './SummaryGrid.styled';

type SummaryGridProps = {
  metrics?: Metrics;
};

const SummaryGrid: React.FC<SummaryGridProps> = props => {
  const {metrics} = props;

  if (!metrics?.executions?.length) {
    return null;
  }

  return (
    <SummaryGridWrapper>
      <SummaryGridItem>
        <CustomText title="PASS/FAIL RATIO" className="uppercase middle" $color={Colors.slate500}>
          pass/fail ratio
        </CustomText>
        <Title level={3}>{metrics?.passFailRatio ? `${metrics?.passFailRatio.toFixed(2)}%` : '-'}</Title>
      </SummaryGridItem>
      <SummaryGridItem>
        <CustomText title="EXECUTION DURATION (P50)" className="uppercase middle" $color={Colors.slate500}>
          execution duration (p50)
        </CustomText>
        <Title level={3}>
          {metrics?.executionDurationP50ms ? formatDuration(metrics?.executionDurationP50ms / 1000) : '-'}
        </Title>
      </SummaryGridItem>
      <SummaryGridItem>
        <CustomText title="EXECUTION DURATION (P95)" className="uppercase middle" $color={Colors.slate500}>
          execution duration (p95)
        </CustomText>
        <Title level={3}>
          {metrics?.executionDurationP95ms ? formatDuration(metrics?.executionDurationP95ms / 1000) : '-'}
        </Title>
      </SummaryGridItem>
      <SummaryGridItem>
        <CustomText title="FAILED EXECUTIONS" className="uppercase middle" $color={Colors.slate500}>
          failed executions
        </CustomText>
        <Title level={3}>{metrics?.failedExecutions || '-'}</Title>
      </SummaryGridItem>
      <SummaryGridItem>
        <CustomText title="TOTAL EXECUTIONS" className="uppercase middle" $color={Colors.slate500}>
          total executions
        </CustomText>
        <Title level={3}>{metrics?.totalExecutions || '-'}</Title>
      </SummaryGridItem>
    </SummaryGridWrapper>
  );
};

export default SummaryGrid;
