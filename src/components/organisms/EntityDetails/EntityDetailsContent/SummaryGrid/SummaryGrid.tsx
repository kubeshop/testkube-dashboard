/* eslint-disable camelcase */
import {useContext} from 'react';

import {Metrics} from '@models/metrics';

import {Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import {MetricsBarChart} from '@src/components/molecules';

import {SummaryGridItem, SummaryGridWrapper} from './SummaryGrid.styled';

type SummaryGridProps = {
  metrics?: Metrics;
};

const SummaryGrid: React.FC<SummaryGridProps> = props => {
  const {metrics} = props;

  // const {
  //   execution_duration_p50,
  //   execution_duration_p90,
  //   execution_duration_p99,
  //   execution_duration_p50_ms,
  //   execution_duration_p99_ms,
  //   executions,
  //   total_executions,
  //   failed_executions,
  //   pass_fail_ratio,
  // } = metrics;

  const {isRowSelected} = useContext(EntityDetailsContext);

  // calculate medianDurationProportion for columns height
  // better to do it inside metricsbar
  const medianDurationProportion = metrics
    ? metrics?.execution_duration_p99_ms / metrics?.execution_duration_p50_ms > 2
      ? 2
      : metrics?.execution_duration_p99_ms / metrics?.execution_duration_p50_ms
    : 0;

  return (
    <>
      <SummaryGridWrapper $gridCols={isRowSelected ? 2 : 5}>
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
          <Title level={3}>{metrics?.execution_duration_p50 || '-'}</Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            execution duration (p90)
          </Text>
          <Title level={3}>{metrics?.execution_duration_p90 || '-'}</Title>
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
      <MetricsBarChart data={metrics?.executions} medianDurationProportion={medianDurationProportion} />
    </>
  );
};

export default SummaryGrid;
