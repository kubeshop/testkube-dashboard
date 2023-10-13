import {SplitLabelText} from '@atoms';

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

  const value = isSkippedMode ? `+${skippedLabelsNumber} more` : labelValue ? `${labelKey}: ${labelValue}` : labelKey;

  return (
    <StyledLabelListItem isSkippedMode={isSkippedMode}>
      <SplitLabelText value={value} />
    </StyledLabelListItem>
  );
};

export default LabelListItem;
