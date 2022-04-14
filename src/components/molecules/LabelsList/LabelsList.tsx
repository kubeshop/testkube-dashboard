import {LabelsObject} from '@models/labels';

import {LabelListItem} from '@atoms';

import {StyledLabelsList} from './LabelsList.styled';

type LabelsListProps = {
  labels: LabelsObject;
  howManyLabelsToShow?: number;
  shouldSkipLabels?: boolean;
  className?: string;
};

const LabelsList: React.FC<LabelsListProps> = props => {
  const {labels, howManyLabelsToShow = 3, shouldSkipLabels = false, className = ''} = props;

  const labelsInArray = Object.keys(labels);

  const renderedLabels = labelsInArray
    .map((labelKey: string, index: number) => {
      if (shouldSkipLabels) {
        if (howManyLabelsToShow < index + 1) {
          return null;
        }
      }

      return <LabelListItem key={labelKey} labelKey={labelKey} labelValue={labels[labelKey]} />;
    })
    .filter(labelComponent => labelComponent);

  const skippedLabelsNumber = labelsInArray.length - renderedLabels.length;

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
