import React from 'react';

import {Tooltip} from '@custom-antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import {StyledCheckOutlined, StyledCopyOutlined} from './CopyButton.styled';

const DownloadButton: React.FC<{content: string; onCopy?: () => void}> = props => {
  const {content, onCopy} = props;
  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(content);

  const handleIconClick = () => {
    setCopyToClipboardState(true);
    onCopy?.();
  };

  return (
    <Tooltip title="Download">
      {isCopied ? <StyledCheckOutlined onClick={handleIconClick} /> : <StyledCopyOutlined onClick={handleIconClick} />}
    </Tooltip>
  );
};

export default DownloadButton;
