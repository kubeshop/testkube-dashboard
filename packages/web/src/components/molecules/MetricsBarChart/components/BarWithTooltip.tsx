import {memo} from 'react';

import {useExecutionDetailsPick} from '@store/executionDetails';

import {SecondaryStatusColors, StatusColors} from '@styles/Colors';

import BarWithTooltipPure from './BarWithTooltipPure';

export type BarConfig = {
  width: number;
  height: number;
  color: StatusColors;
  hoverColor: SecondaryStatusColors;
  status: any;
  duration: string;
  name: string;
  startTime: number;
  date?: string;
  chartHeight: number;
};

const BarWithTooltip: React.FC<BarConfig> = props => {
  const {openByName} = useExecutionDetailsPick('openByName');
  return <BarWithTooltipPure {...props} onSelect={openByName} />;
};

export default memo(BarWithTooltip);
