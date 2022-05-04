import {Tooltip, TooltipProps} from 'antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import Colors from '@styles/Colors';

import {StyledCopyCommandIcon} from '../../CLICommands/CopyCommand.styled';
import {LogActionProps} from '../LogOutput';
import {StyledActionIconContainer} from '../LogOutput.styled';

const CopyAction: React.FC<LogActionProps> = props => {
  const {logOutput} = props;

  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(logOutput);

  const onCopy = () => {
    setCopyToClipboardState(true);
  };

  const tooltipProps: TooltipProps = {
    title: isCopied ? 'Copied' : 'Copy',
    placement: 'top',
    color: Colors.purple,
  };

  return (
    <StyledActionIconContainer onClick={onCopy}>
      <Tooltip {...tooltipProps}>
        <StyledCopyCommandIcon />
      </Tooltip>
    </StyledActionIconContainer>
  );
};

export default CopyAction;
