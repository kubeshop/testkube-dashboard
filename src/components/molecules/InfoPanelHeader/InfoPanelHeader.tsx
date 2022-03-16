import {LabelsObject} from '@models/labels';

import {Title} from '@atoms';

import {LabelsList} from '@molecules';

import {StyledInfoPanelHeaderContainer, StyledInfoPanelHeaderLeftPart} from './InfoPanelHeader.styled';

type InfoPanelHeaderProps = {
  title: string;
  labels?: LabelsObject;
};

const InfoPanelHeader: React.FC<InfoPanelHeaderProps> = props => {
  const {title, labels} = props;

  return (
    <StyledInfoPanelHeaderContainer>
      <StyledInfoPanelHeaderLeftPart>
        <Title level={4}>{title}</Title>
        {labels ? <LabelsList labels={labels} /> : null}
      </StyledInfoPanelHeaderLeftPart>
    </StyledInfoPanelHeaderContainer>
  );
};

export default InfoPanelHeader;
