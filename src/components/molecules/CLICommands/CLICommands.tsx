import {
  StyledInfoPanelSection,
  StyledInfoPanelSectionTitle,
} from '../../organisms/DashboardInfoPanel/DashboardInfoPanel.styled';
import CopyCommand from './CopyCommand';

type CLICommandsProps = {
  cliCommands: Array<any>;
};

const CLICommands: React.FC<CLICommandsProps> = props => {
  const {cliCommands} = props;

  const renderedCLICommands = cliCommands.map(value => {
    return <CopyCommand command={value.command} label={value.label} />;
  });

  return (
    <StyledInfoPanelSection>
      <StyledInfoPanelSectionTitle>CLI Commands</StyledInfoPanelSectionTitle>
      {renderedCLICommands}
    </StyledInfoPanelSection>
  );
};

export default CLICommands;
