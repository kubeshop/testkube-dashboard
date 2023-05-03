import {useContext} from 'react';

import {SecondaryStatusColors, StatusColors} from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import BarWithTooltipPure from './BarWithTooltipPure';

export type BarConfig = {
  width: number;
  height: number;
  color: StatusColors;
  hoverColor: SecondaryStatusColors;
  tooltipData: any;
  date?: string;
  chartHeight: number;
};

const BarWithTooltip: React.FC<BarConfig> = props => {
  const {executionsList, onRowSelect} = useContext(EntityDetailsContext);
  return (
    <BarWithTooltipPure {...props} executionsList={executionsList} onRowSelect={onRowSelect} />
  );
};

export default BarWithTooltip;
