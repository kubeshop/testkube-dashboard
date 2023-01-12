import {Metrics} from '@models/metrics';

import {Text, Title} from '@custom-antd';

import {MetricsBarChart} from '@molecules';

import {formatDuration} from '@utils/formatDate';

import Colors from '@styles/Colors';

import {SummaryGridItem, SummaryGridWrapper} from './SummaryGrid.styled';

type SummaryGridProps = {
  metrics: Metrics;
  isRowSelected: boolean;
};

const SummaryGrid: React.FC<SummaryGridProps> = props => {
  const {metrics, isRowSelected} = props;

  return (
    <>
      <SummaryGridWrapper>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            pass/fail ratio
          </Text>
          <Title level={3}>{metrics?.passFailRatio ? `${metrics?.passFailRatio.toFixed(2)}%` : '-'}</Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            execution duration (p50)
          </Text>
          <Title level={3}>
            {metrics?.executionDurationP50ms ? formatDuration(metrics?.executionDurationP50ms / 1000) : '-'}
          </Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            execution duration (p95)
          </Text>
          <Title level={3}>
            {metrics?.executionDurationP95ms ? formatDuration(metrics?.executionDurationP95ms / 1000) : '-'}
          </Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            failed executions
          </Text>
          <Title level={3}>{metrics?.failedExecutions || '-'}</Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            total executions
          </Text>
          <Title level={3}>{metrics?.totalExecutions || '-'}</Title>
        </SummaryGridItem>
      </SummaryGridWrapper>
      <MetricsBarChart
        data={metrics?.executions}
        isDetailsView
        executionDurationP50ms={metrics?.executionDurationP50ms}
        executionDurationP95ms={metrics?.executionDurationP95ms}
      />
    </>
  );
};

export default SummaryGrid;
