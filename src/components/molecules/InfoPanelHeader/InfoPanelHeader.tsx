import {LabelsObject} from '@models/labels';
import {TestType} from '@models/tests';

import {Title} from '@atoms';

import {LabelsList} from '@molecules';

import TestRunner from '../TestRunner';
import {
  StyledInfoPanelHeaderContainer,
  StyledInfoPanelHeaderDescription,
  StyledInfoPanelHeaderLeftPart,
  StyledInfoPanelHeaderRightPart,
  StyledRunButton,
} from './InfoPanelHeader.styled';

type InfoPanelHeaderProps = {
  title?: string;
  labels?: LabelsObject;
  testType?: TestType;
  description?: string;
  isLoading?: boolean;
  onRunButtonClick: () => void;
};

const InfoPanelHeader: React.FC<InfoPanelHeaderProps> = props => {
  const {title, labels, testType, description, isLoading, onRunButtonClick} = props;

  return (
    <StyledInfoPanelHeaderContainer>
      <StyledInfoPanelHeaderLeftPart>
        {title ? <Title level={4}>{title}</Title> : null}
        {description ? <StyledInfoPanelHeaderDescription>{description}</StyledInfoPanelHeaderDescription> : null}
        {testType ? <TestRunner testType={testType} /> : null}
        {labels ? <LabelsList labels={labels} /> : null}
      </StyledInfoPanelHeaderLeftPart>
      <StyledInfoPanelHeaderRightPart>
        <StyledRunButton onClick={onRunButtonClick}>Run</StyledRunButton>
      </StyledInfoPanelHeaderRightPart>
    </StyledInfoPanelHeaderContainer>
  );
};

export default InfoPanelHeader;
