import {memo} from 'react';

import {useLastCallback} from '@hooks/useLastCallback';

import {useEntityDetailsPick} from '@store/entityDetails';
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
  const {executions} = useEntityDetailsPick('executions');
  const {open} = useExecutionDetailsPick('open');
  const onSelect = useLastCallback((name: string) => {
    const targetRecord = executions.results?.find((item: any) => item.name === name);
    if (targetRecord) {
      open(targetRecord.id);
    }
  });
  return <BarWithTooltipPure {...props} onSelect={onSelect} />;
};

export default memo(BarWithTooltip);
