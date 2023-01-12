import React from 'react';

import {intervalToDuration} from 'date-fns';

import {AxisLabel, HorizontalAxis} from '../MetricsBarChart.styled';

type PAxisLineProps = {
  axisTop: number;
  durationMs: number;
  label?: string;
  dontApplyMargin?: boolean;
};

const margin = 3;

const PAxisLine: React.FC<PAxisLineProps> = props => {
  const {axisTop, durationMs, label, dontApplyMargin} = props;

  const finalTopValue = dontApplyMargin ? axisTop : axisTop + margin;

  const duration = intervalToDuration({start: 0, end: durationMs});
  const formattedDuration =
    (duration.years ? `${duration.years}y ` : '') +
    (duration.weeks ? `${duration.weeks}w ` : '') +
    (duration.days ? `${duration.days}d ` : '') +
    (duration.hours ? `${duration.hours}h ` : '') +
    (duration.minutes ? `${duration.minutes}m ` : '') +
    (duration.seconds ? `${duration.seconds}s` : '');

  return (
    <>
      <HorizontalAxis $top={finalTopValue} label={label} />
      <AxisLabel $top={axisTop}>
        {label} {formattedDuration}
      </AxisLabel>
    </>
  );
};

export default PAxisLine;
