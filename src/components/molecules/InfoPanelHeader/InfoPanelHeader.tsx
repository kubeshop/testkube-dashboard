import {ScriptType} from '@models/scripts';

import {Title} from '@atoms';

import {TestRunner} from '@molecules';

import {StyledInfoPanelHeaderContainer} from './InfoPanelHeader.styled';

type InfoPanelHeaderProps = {
  scriptType?: ScriptType;
  title: string;
};

const InfoPanelHeader: React.FC<InfoPanelHeaderProps> = props => {
  const {title, scriptType} = props;

  return (
    <StyledInfoPanelHeaderContainer>
      <Title level={4}>{title}</Title>
      {scriptType && <TestRunner scriptType={scriptType} />}
    </StyledInfoPanelHeaderContainer>
  );
};

export default InfoPanelHeader;
