import {LabelKey, LabelValue} from '@models/labels';

import {StyledLabel} from './LabelChild.styled';

type LabelChildProps = {
  labelKey: LabelKey;
  labelValue: LabelValue;
};

const LabelChild: React.FC<LabelChildProps> = props => {
  const {labelKey, labelValue} = props;

  const value = `${labelKey}: ${labelValue}`;

  return <StyledLabel>{value}</StyledLabel>;
};

export default LabelChild;
