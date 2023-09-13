import {memo} from 'react';

import {Popover} from 'antd';

import {LabelListItem} from '@atoms';

import {LabelsPopover, StyledLabelsList} from './LabelsList.styled';

type LabelsListProps = {
  labels?: {label: string; value: string}[];
  howManyLabelsToShow?: number;
  shouldSkipLabels?: boolean;
  className?: string;
};

const LabelsList: React.FC<LabelsListProps> = props => {
  const {labels = [], howManyLabelsToShow = 3, shouldSkipLabels = false, className = ''} = props;

  const renderedLabels = labels
    .map((label, index) => {
      if (shouldSkipLabels) {
        if (howManyLabelsToShow < index + 1) {
          return null;
        }
      }

      return <LabelListItem key={label.value} labelKey={label.label} labelValue={label.value} />;
    })
    .filter(labelComponent => labelComponent);

  const skippedLabelsNumber = labels.length - renderedLabels.length;
  const skippedLabelsArray = [...labels.slice(howManyLabelsToShow)];

  const renderedSkippedLabels = skippedLabelsArray
    ? skippedLabelsArray.map(label => {
        return <LabelListItem key={label.value} labelKey={label.label} labelValue={label.value} />;
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

export default memo(LabelsList);
