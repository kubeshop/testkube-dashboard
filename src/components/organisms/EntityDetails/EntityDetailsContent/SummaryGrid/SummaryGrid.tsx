import React, {memo} from 'react';

import {Metrics} from '@models/metrics';

import {formatDuration} from '@utils/formatDate';

import {SummaryGridWrapper} from './SummaryGrid.styled';
import SummaryGridItem from './SummaryGridItem';

type SummaryGridProps = {
  metrics?: Metrics;
};

const SummaryGrid: React.FC<SummaryGridProps> = memo(props => {
  const {metrics} = props;

  if (!metrics?.executions?.length) {
    return null;
  }

  return (
    <SummaryGridWrapper>
      <SummaryGridItem
        title="PASS/FAIL RATIO"
        value={metrics?.passFailRatio && `${metrics?.passFailRatio.toFixed(2)}%`}
      />
      <SummaryGridItem
        title="EXECUTION DURATION (P50)"
        value={metrics?.executionDurationP50ms && formatDuration(metrics?.executionDurationP50ms / 1000)}
      />
      <SummaryGridItem
        title="EXECUTION DURATION (P95)"
        value={metrics?.executionDurationP95ms && formatDuration(metrics?.executionDurationP95ms / 1000)}
      />
      <SummaryGridItem title="FAILED EXECUTIONS" value={metrics?.failedExecutions} />
      <SummaryGridItem title="TOTAL EXECUTIONS" value={metrics?.totalExecutions} />
    </SummaryGridWrapper>
  );
});

export default SummaryGrid;
