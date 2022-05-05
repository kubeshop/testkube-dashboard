import {Tooltip} from '@custom-antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import {StyledCopyCommandIcon} from '../../CLICommands/CopyCommand.styled';
import {LogActionProps} from '../LogOutput';
import {StyledActionIconContainer} from '../LogOutput.styled';

const CopyAction: React.FC<LogActionProps> = props => {
  const {logOutput} = props;

  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(logOutput);

  const onCopy = () => {
    setCopyToClipboardState(true);
  };

  const tooltipTitle = isCopied ? 'Copied' : 'Copy';

  return (
    <StyledActionIconContainer onClick={onCopy}>
      <Tooltip title={tooltipTitle}>
        <StyledCopyCommandIcon />
      </Tooltip>
    </StyledActionIconContainer>
  );
};

export default CopyAction;
