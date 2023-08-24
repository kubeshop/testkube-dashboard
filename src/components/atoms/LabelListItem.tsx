import {FC} from 'react';

import type {EntityKey, EntityValue} from '@models/entityMap';

import {StyledLabelListItem} from './LabelListItem.styled';
import {SplitLabelText} from './SplitLabelText';

type LabelListItemProps = {
  labelKey?: EntityKey;
  labelValue?: EntityValue;
  isSkippedMode?: boolean;
  skippedLabelsNumber?: number;
};

export const LabelListItem: FC<LabelListItemProps> = props => {
  const {labelKey = '', labelValue = '', isSkippedMode = false, skippedLabelsNumber = 0} = props;

  const value = isSkippedMode ? `+${skippedLabelsNumber} more` : labelValue ? `${labelKey}: ${labelValue}` : labelKey;

  return (
    <StyledLabelListItem isSkippedMode={isSkippedMode}>
      <SplitLabelText value={value} />
    </StyledLabelListItem>
  );
};
