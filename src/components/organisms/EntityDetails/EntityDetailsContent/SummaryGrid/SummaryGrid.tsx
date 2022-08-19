/* eslint-disable camelcase */
import {Metrics} from '@models/metrics';

import {Text, Title} from '@custom-antd';

import {formatDuration} from '@utils/formatDate';

import Colors from '@styles/Colors';

import {MetricsBarChart} from '@src/components/molecules';

import {SummaryGridItem, SummaryGridWrapper} from './SummaryGrid.styled';

type SummaryGridProps = {
  metrics?: Metrics;
};

const SummaryGrid: React.FC<SummaryGridProps> = props => {
  const {metrics} = props;

  return (
    <>
      <SummaryGridWrapper>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            pass/fail ratio
          </Text>
          <Title level={3}>{metrics?.pass_fail_ratio ? `${metrics?.pass_fail_ratio.toFixed(2)}%` : '-'}</Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            execution duration (p50)
          </Text>
          <Title level={3}>
            {metrics?.execution_duration_p50_ms ? formatDuration(metrics?.execution_duration_p50_ms / 1000) : '-'}
          </Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            execution duration (p95)
          </Text>
          <Title level={3}>
            {metrics?.execution_duration_p95_ms ? formatDuration(metrics?.execution_duration_p95_ms / 1000) : '-'}
          </Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            failed executions
          </Text>
          <Title level={3}>{metrics?.failed_executions || '-'}</Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            total executions
          </Text>
          <Title level={3}>{metrics?.total_executions || '-'}</Title>
        </SummaryGridItem>
      </SummaryGridWrapper>
      <MetricsBarChart
        data={metrics?.executions}
        execution_duration_p95_ms={metrics?.execution_duration_p95_ms}
        execution_duration_p50_ms={metrics?.execution_duration_p50_ms}
      />
    </>
  );
};

export default SummaryGrid;
