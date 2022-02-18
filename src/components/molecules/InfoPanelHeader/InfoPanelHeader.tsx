import {TestType} from '@models/tests';

import {Title} from '@atoms';

import {TestRunner} from '@molecules';

import {StyledInfoPanelHeaderContainer} from './InfoPanelHeader.styled';

type InfoPanelHeaderProps = {
  testType?: TestType;
  title: string;
};

const InfoPanelHeader: React.FC<InfoPanelHeaderProps> = props => {
  const {title, testType} = props;

  return (
    <StyledInfoPanelHeaderContainer>
      <Title level={4}>{title}</Title>
      {testType && <TestRunner testType={testType} />}
    </StyledInfoPanelHeaderContainer>
  );
};

export default InfoPanelHeader;
