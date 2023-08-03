import React, {FC, memo} from 'react';

import {LoadingOutlined} from '@ant-design/icons';

import {Metrics} from '@models/metrics';

import {formatDuration} from '@utils/formatDate';

import {SummaryGridWrapper} from './SummaryGrid.styled';
import SummaryGridItem from './SummaryGridItem';

type SummaryGridProps = {
  metrics?: Metrics;
};

const SummaryGrid: FC<SummaryGridProps> = memo(props => {
  const {metrics} = props;

  if (!metrics) {
    return (
      <SummaryGridWrapper>
        <SummaryGridItem title="PASS/FAIL RATIO" value={<LoadingOutlined />} />
        <SummaryGridItem title="EXECUTION DURATION (P50)" value={<LoadingOutlined />} />
        <SummaryGridItem title="EXECUTION DURATION (P95)" value={<LoadingOutlined />} />
        <SummaryGridItem title="FAILED EXECUTIONS" value={<LoadingOutlined />} />
        <SummaryGridItem title="TOTAL EXECUTIONS" value={<LoadingOutlined />} />
      </SummaryGridWrapper>
    );
  }

  return (
    <SummaryGridWrapper>
      <SummaryGridItem
        title="PASS/FAIL RATIO"
        value={metrics.passFailRatio && `${metrics.passFailRatio.toFixed(2)}%`}
      />
      <SummaryGridItem
        title="EXECUTION DURATION (P50)"
        value={metrics.executionDurationP50ms && formatDuration(metrics.executionDurationP50ms / 1000)}
      />
      <SummaryGridItem
        title="EXECUTION DURATION (P95)"
        value={metrics.executionDurationP95ms && formatDuration(metrics.executionDurationP95ms / 1000)}
      />
      <SummaryGridItem title="FAILED EXECUTIONS" value={metrics.failedExecutions} />
      <SummaryGridItem title="TOTAL EXECUTIONS" value={metrics.totalExecutions} />
    </SummaryGridWrapper>
  );
});

export default SummaryGrid;
