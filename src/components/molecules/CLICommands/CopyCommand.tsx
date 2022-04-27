import {useEffect, useState} from 'react';

import {Tooltip, TooltipProps} from 'antd';

import {useGA4React} from 'ga-4-react';

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

  const ga4React = useGA4React();

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

  useEffect(() => {
    if (ga4React) {
      ga4React.gtag('event', 'copy_command', {command: label});
    }
  }, [ga4React]);

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
