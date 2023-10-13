import React from 'react';

import {intervalToDuration} from 'date-fns';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {AxisLabel, HorizontalAxis} from '../MetricsBarChart.styled';

type PAxisLineProps = {
  axisTop: number;
  durationMs: number;
  label?: string;
  dontApplyMargin?: boolean;
  isLabelVisible: boolean;
};

const margin = 3;

const PAxisLine: React.FC<PAxisLineProps> = props => {
  const {axisTop, durationMs, label, dontApplyMargin, isLabelVisible} = props;

  const finalTopValue = dontApplyMargin ? axisTop : axisTop + margin;

  if (!Number.isSafeInteger(durationMs)) {
    return null;
  }

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
      {isLabelVisible ? (
        <AxisLabel $top={finalTopValue + 2}>
          <Text color={Colors.slate400}>
            {label} {formattedDuration}
          </Text>
        </AxisLabel>
      ) : null}
    </>
  );
};

export default PAxisLine;
