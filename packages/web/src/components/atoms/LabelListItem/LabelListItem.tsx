import {SplitLabelText} from '@atoms';

import {EntityKey, EntityValue} from '@models/entityMap';

import {StyledLabelListItem} from './LabelListItem.styled';

type LabelListItemProps = {
  labelKey?: EntityKey;
  labelValue?: EntityValue;
  isSkippedMode?: boolean;
  skippedLabelsNumber?: number;
  type?: 'primary' | 'secondary';
};

const LabelListItem: React.FC<LabelListItemProps> = props => {
  const {labelKey = '', labelValue = '', isSkippedMode = false, skippedLabelsNumber = 0, type = 'primary'} = props;

  const value = isSkippedMode ? `+${skippedLabelsNumber} more` : labelValue ? `${labelKey}: ${labelValue}` : labelKey;

  return (
    <StyledLabelListItem $type={type}>
      <SplitLabelText type={type} value={value} />
    </StyledLabelListItem>
  );
};

export default LabelListItem;
