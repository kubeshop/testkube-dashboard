import {EntityKey, EntityValue} from '@models/entityMap';

import {StyledLabelListItem} from './LabelListItem.styled';

type LabelListItemProps = {
  labelKey?: EntityKey;
  labelValue?: EntityValue;
  isSkippedMode?: boolean;
  skippedLabelsNumber?: number;
};

const LabelListItem: React.FC<LabelListItemProps> = props => {
  const {labelKey = '', labelValue = '', isSkippedMode = false, skippedLabelsNumber = 0} = props;

  const value = isSkippedMode ? `+${skippedLabelsNumber}` : labelValue ? `${labelKey}: ${labelValue}` : labelKey;

  return <StyledLabelListItem isSkippedMode={isSkippedMode}>{value}</StyledLabelListItem>;
};

export default LabelListItem;
