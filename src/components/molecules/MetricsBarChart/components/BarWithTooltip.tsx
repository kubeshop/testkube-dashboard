import {FC} from 'react';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';

import {SecondaryStatusColors, StatusColors} from '@styles/Colors';

import {BarWithTooltipPure} from './BarWithTooltipPure';

export type BarConfig = {
  width: number;
  height: number;
  color: StatusColors;
  hoverColor: SecondaryStatusColors;
  tooltipData: any;
  date?: string;
  chartHeight: number;
};

export const BarWithTooltip: FC<BarConfig> = props => {
  const {executions} = useEntityDetailsPick('executions');
  const {open} = useExecutionDetailsPick('open');
  return <BarWithTooltipPure {...props} executions={executions} onSelect={open} />;
};
