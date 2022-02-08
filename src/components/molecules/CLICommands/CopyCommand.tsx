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

const CopyCommand = (props: any) => {
  const {command, label} = props;

  const [isHovered, setHoverState] = useState(false);

  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(command);

  const onCopy = () => {
    setCopyToClipboardState(true);
  };

  const tooltipProps: TooltipProps = {
    title: isCopied ? 'Copied' : 'Copy',
    placement: 'top',
    color: Colors.blue6,
  };

  const onHover = () => {
    setHoverState(true);
  };

  const onUnhover = () => {
    setHoverState(true);
  };

  return (
    <>
      <StyledCopyCommandLabel>{label}</StyledCopyCommandLabel>
      <StyledCopyCommandContainer onMouseOver={onHover} onMouseOut={onUnhover} isHovered={isHovered} onClick={onCopy}>
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
