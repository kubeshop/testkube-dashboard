import {LabelKey, LabelValue} from '@models/labels';

import {StyledLabelListItem} from './LabelListItem.styled';

type LabelListItemProps = {
  labelKey: LabelKey;
  labelValue: LabelValue;
};

const LabelListItem: React.FC<LabelListItemProps> = props => {
  const {labelKey, labelValue} = props;

  const value = `${labelKey}: ${labelValue}`;

  return <StyledLabelListItem>{value}</StyledLabelListItem>;
};

export default LabelListItem;
