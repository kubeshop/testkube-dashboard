import React from 'react';

import {Tooltip} from '@custom-antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import {StyledCheckOutlined, StyledCopyOutlined} from './CopyButton.styled';

const CopyButton: React.FC<{content: string; onClick?: () => void}> = props => {
  const {content, onClick} = props;
  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(content);

  const handleIconClick = () => {
    setCopyToClipboardState(true);
    onClick?.();
  };

  return (
    <Tooltip title={isCopied ? 'Copied' : 'Copy'}>
      {isCopied ? <StyledCheckOutlined onClick={handleIconClick} /> : <StyledCopyOutlined onClick={handleIconClick} />}
    </Tooltip>
  );
};

export default CopyButton;
