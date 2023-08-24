import {FC, memo} from 'react';

import {Popover} from 'antd';

import {LabelListItem} from '@atoms/LabelListItem';

import type {EntityKey, EntityMap} from '@models/entityMap';

import {LabelsPopover, StyledLabelsList} from './LabelsList.styled';

type LabelsListProps = {
  labels: EntityMap;
  howManyLabelsToShow?: number;
  shouldSkipLabels?: boolean;
  className?: string;
};

export const LabelsList: FC<LabelsListProps> = memo(props => {
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
  const skippedLabelsArray = Object.entries(labels).splice(howManyLabelsToShow, skippedLabelsNumber);

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
});
