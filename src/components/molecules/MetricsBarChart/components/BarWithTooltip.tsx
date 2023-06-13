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
  const {executionsList, onRowSelect} = useEntityDetailsStore(x => ({
    executionsList: x.executionsList,
    onRowSelect: x.onRowSelect,
  }));
  return <BarWithTooltipPure {...props} executionsList={executionsList} onRowSelect={onRowSelect} />;
};

export default BarWithTooltip;
