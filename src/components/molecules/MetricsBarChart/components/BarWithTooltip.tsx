import {useEntityDetailsStore} from '@store/entityDetails';

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
  const {executions, openExecutionDetails} = useEntityDetailsStore(x => ({
    executions: x.executions,
    openExecutionDetails: x.openExecutionDetails,
  }));
  return <BarWithTooltipPure {...props} executions={executions} openExecutionDetails={openExecutionDetails} />;
};

export default BarWithTooltip;
