import {LabelsObject} from '@models/labels';

import {LabelChild} from '@molecules';

import {StyledLabels} from './Labels.styled';

type LabelsProps = {
  labels: LabelsObject;
};

const Labels: React.FC<LabelsProps> = props => {
  const {labels} = props;

  const renderedLabels = Object.keys(labels).map((labelKey: string) => {
    return <LabelChild key={labelKey} labelKey={labelKey} labelValue={labels[labelKey]} />;
  });

  return <StyledLabels>{renderedLabels}</StyledLabels>;
};

export default Labels;
