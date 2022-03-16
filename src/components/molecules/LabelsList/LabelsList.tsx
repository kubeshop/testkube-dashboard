import {LabelsObject} from '@models/labels';

import {LabelListItem} from '@atoms';

import {StyledLabelsList} from './LabelsList.styled';

type LabelsListProps = {
  labels: LabelsObject;
};

const LabelsList: React.FC<LabelsListProps> = props => {
  const {labels} = props;

  const renderedLabels = Object.keys(labels).map((labelKey: string) => {
    return <LabelListItem key={labelKey} labelKey={labelKey} labelValue={labels[labelKey]} />;
  });

  return <StyledLabelsList>{renderedLabels}</StyledLabelsList>;
};

export default LabelsList;
