import {useMemo} from 'react';

import {Space} from 'antd';

import {LabelKey} from '@models/labels';

import {StyledAppliedLabel, StyledAppliedLabelContainer, StyledCloseIcon} from './LabelsFilter.styled';

type AppliedLabelsProps = {
  appliedLabels: LabelKey[];
  onLabelChange: (label: LabelKey) => void;
};

type AppliedLabelProps = {
  label: LabelKey;
};

const AppliedLabel: React.FC<Pick<AppliedLabelsProps, 'onLabelChange'> & AppliedLabelProps> = props => {
  const {label, onLabelChange} = props;

  return (
    <StyledAppliedLabelContainer
      onClick={() => {
        onLabelChange(label);
      }}
    >
      <StyledAppliedLabel>{label}</StyledAppliedLabel>
      <StyledCloseIcon />
    </StyledAppliedLabelContainer>
  );
};

const AppliedLabels: React.FC<AppliedLabelsProps> = props => {
  const {appliedLabels, onLabelChange} = props;

  const renderedAppliedLabels = useMemo(() => {
    return appliedLabels.map(appliedLabel => {
      return <AppliedLabel label={appliedLabel} onLabelChange={onLabelChange} />;
    });
  }, [appliedLabels]);

  return <Space size={10}>{renderedAppliedLabels}</Space>;
};

export default AppliedLabels;
