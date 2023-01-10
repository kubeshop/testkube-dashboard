import React from 'react';

import {HorizontalAxis} from '../MetricsBarChart.styled';
import {secondInMs} from '../utils';

type PAxisLineProps = {
  axisTop: number;
  durationMs?: number;
  label: string;
};
const PAxisLine: React.FC<PAxisLineProps> = props => {
  const {axisTop, durationMs, label} = props;

  const durationSec = Number(durationMs) / secondInMs;

  return (
    <>
      <HorizontalAxis $top={axisTop} />
      {/* <AxisLabel $top={axisTopPercent - 11} isExtendedPadding={durationSec > 60}>
        {label} ({formatDuration(durationSec)})
      </AxisLabel> */}
    </>
  );
};

export default PAxisLine;
