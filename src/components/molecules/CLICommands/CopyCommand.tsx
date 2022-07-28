import {useContext, useState} from 'react';

import {Tooltip} from '@custom-antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import {MainContext} from '@contexts';

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

  const {ga4React} = useContext(MainContext);

  const [isHovered, setHoverState] = useState(false);

  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(command);

  const onCopy = () => {
    if (ga4React) {
      ga4React.gtag('event', 'copy_command', {command: label});
    }

    setCopyToClipboardState(true);
  };

  const onMouseOver = () => {
    setHoverState(true);
  };

  const onMouseOut = () => {
    setHoverState(true);
  };

  const tooltipTitle = isCopied ? 'Copied' : 'Copy';

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
          <StyledCopyCommandCode>
            <span>$</span>
            {command}
          </StyledCopyCommandCode>
        </StyledCopyCommandPre>
        <Tooltip title={tooltipTitle}>
          <StyledCopyCommandIcon onClick={onCopy} />
        </Tooltip>
      </StyledCopyCommandContainer>
    </>
  );
};

export default CopyCommand;
