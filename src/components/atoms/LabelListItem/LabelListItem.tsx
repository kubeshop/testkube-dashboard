import {LabelKey, LabelValue} from '@models/labels';

import {StyledLabelListItem} from './LabelListItem.styled';

type LabelListItemProps = {
  labelKey?: LabelKey;
  labelValue?: LabelValue;
  isSkippedMode?: boolean;
  skippedLabelsNumber?: number;
};

const LabelListItem: React.FC<LabelListItemProps> = props => {
  const {labelKey = '', labelValue = '', isSkippedMode = false, skippedLabelsNumber = 0} = props;

  const value = isSkippedMode ? `+${skippedLabelsNumber}` : `${labelKey}: ${labelValue}`;

  return <StyledLabelListItem isSkippedMode={isSkippedMode}>{value}</StyledLabelListItem>;
};

export default LabelListItem;
