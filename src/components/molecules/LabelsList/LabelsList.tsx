import {EntityKey, EntityMap} from '@models/entityMap';

import {LabelListItem} from '@atoms';

import {StyledLabelsList} from './LabelsList.styled';

type LabelsListProps = {
  labels: EntityMap;
  howManyLabelsToShow?: number;
  shouldSkipLabels?: boolean;
  className?: string;
};

const LabelsList: React.FC<LabelsListProps> = props => {
  const {labels, howManyLabelsToShow = 3, shouldSkipLabels = false, className = ''} = props;

  const labelKeys: EntityKey[] = Object.keys(labels);

  const renderedLabels = labelKeys
    .map((labelKey, index) => {
      if (shouldSkipLabels) {
        if (howManyLabelsToShow < index + 1) {
          return null;
        }
      }

      return <LabelListItem key={labelKey} labelKey={labelKey} labelValue={labels[labelKey]} />;
    })
    .filter(labelComponent => labelComponent);

  const skippedLabelsNumber = labelKeys.length - renderedLabels.length;

  return (
    <StyledLabelsList className={className}>
      {renderedLabels}
      {skippedLabelsNumber ? (
        <LabelListItem key="skipped-labels-number" isSkippedMode skippedLabelsNumber={skippedLabelsNumber} />
      ) : null}
    </StyledLabelsList>
  );
};

export default LabelsList;
