import React from 'react';

import {formatDuration} from '@utils/formatDate';

import {AxisLabel, HorizontalAxis} from './MetricsBarChart.styled';

type PAxisLineProps = {
  axisTopPercent: number;
  durationMs?: number;
  label: string;
};
const PAxisLine: React.FC<PAxisLineProps> = props => {
  const {axisTopPercent, durationMs, label} = props;
  const durationSec = Number(durationMs) / 1000;
  return (
    <>
      <HorizontalAxis $top={axisTopPercent} />
      <AxisLabel $top={axisTopPercent - 11} isExtendedPadding={durationSec > 60}>
        {label} ({formatDuration(durationSec)})
      </AxisLabel>
    </>
  );
};

export default PAxisLine;
