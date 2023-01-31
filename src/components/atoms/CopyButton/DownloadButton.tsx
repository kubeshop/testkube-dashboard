import React from 'react';

import {Tooltip} from '@custom-antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import {StyledCheckOutlined, StyledCopyOutlined} from './CopyButton.styled';

type SaveOptions = {
  content: string;
  onCopy?: () => void;
  filename: string;
};

const DownloadButton: React.FC<SaveOptions> = props => {
  const {content, onCopy, filename} = props;
  const {setCopyToClipboardState} = useCopyToClipboard(content, {
    filename,
  });

  const handleIconClick = () => {
    setCopyToClipboardState(true);
    onCopy?.();
  };

  return (
    <Tooltip title="Download">
      <StyledCopyOutlined onClick={handleIconClick} />
    </Tooltip>
  );
};

export default DownloadButton;
