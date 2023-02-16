import {Popover} from 'antd';

import {EntityKey, EntityMap} from '@models/entityMap';

import {LabelListItem} from '@atoms';

import {LabelsPopover, StyledLabelsList} from './LabelsList.styled';

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
  const skippedLabelsArray = Object.entries(labels).splice(0, skippedLabelsNumber);

  const renderedSkippedLabels = skippedLabelsArray
    ? skippedLabelsArray.map(([labelKey]) => {
        return <LabelListItem key={labelKey} labelKey={labelKey} labelValue={labels[labelKey]} />;
      })
    : null;

  return (
    <StyledLabelsList className={className}>
      {renderedLabels}
      {skippedLabelsNumber ? (
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Popover content={<LabelsPopover>{renderedSkippedLabels}</LabelsPopover>} placement="top">
            <div>
              <LabelListItem
                key="skipped-labels-number"
                isSkippedMode={shouldSkipLabels}
                skippedLabelsNumber={skippedLabelsNumber}
              />
            </div>
          </Popover>
        </div>
      ) : null}
    </StyledLabelsList>
  );
};

export default LabelsList;
