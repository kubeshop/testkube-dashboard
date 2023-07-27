import {useEntityDetailsPick} from '@store/entityDetails';

import {SecondaryStatusColors, StatusColors} from '@styles/Colors';

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
  const {executions, openExecutionDetails} = useEntityDetailsPick('executions', 'openExecutionDetails');
  return <BarWithTooltipPure {...props} executions={executions} openExecutionDetails={openExecutionDetails} />;
};

export default BarWithTooltip;
