import {useState} from 'react';

import {Tooltip, TooltipProps} from 'antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import Colors from '@styles/Colors';

import {
  StyledCopyCommandCode,
  StyledCopyCommandContainer,
  StyledCopyCommandIcon,
  StyledCopyCommandLabel,
  StyledCopyCommandPre,
} from './CopyCommand.styled';

type CopyCommandProps = {
  command: string;
  label?: string;
};

const CopyCommand: React.FC<CopyCommandProps> = props => {
  const {command, label} = props;

  const [isHovered, setHoverState] = useState(false);

  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(command);

  const onCopy = () => {
    setCopyToClipboardState(true);
  };

  const tooltipProps: TooltipProps = {
    title: isCopied ? 'Copied' : 'Copy',
    placement: 'top',
    color: Colors.purple,
  };

  const onMouseOver = () => {
    setHoverState(true);
  };

  const onMouseOut = () => {
    setHoverState(true);
  };

  return (
    <>
      {label ? <StyledCopyCommandLabel>{label}</StyledCopyCommandLabel> : null}
      <StyledCopyCommandContainer
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        isHovered={isHovered}
        onClick={onCopy}
      >
        <StyledCopyCommandPre>
          <StyledCopyCommandCode>{command}</StyledCopyCommandCode>
        </StyledCopyCommandPre>
        <Tooltip {...tooltipProps}>
          <StyledCopyCommandIcon onClick={onCopy} />
        </Tooltip>
      </StyledCopyCommandContainer>
    </>
  );
};

export default CopyCommand;
