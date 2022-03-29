import {LabelsObject} from '@models/labels';

import {LabelListItem} from '@atoms';

import {StyledLabelsList} from './LabelsList.styled';

type LabelsListProps = {
  labels: LabelsObject;
  howManyLabelsToShow?: number;
  shouldSkipLabels?: boolean;
};

const LabelsList: React.FC<LabelsListProps> = props => {
  const {labels, howManyLabelsToShow = 3, shouldSkipLabels = false} = props;

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

  const skippedLabels = labelsInArray.length - renderedLabels.length;

  return (
    <StyledLabelsList>
      {renderedLabels}
      {skippedLabels ? (
        <LabelListItem key="skipped-labels-number" isSkippedMode skippedLabelsNumber={skippedLabels} />
      ) : null}
    </StyledLabelsList>
  );
};

export default LabelsList;
