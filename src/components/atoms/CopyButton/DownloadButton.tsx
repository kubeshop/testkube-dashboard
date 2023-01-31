import React from 'react';

import {Tooltip} from '@custom-antd';

import {useDownloadFile} from '@hooks/useDownloadFile';

import {StyledCopyOutlined} from './CopyButton.styled';

type SaveOptions = {
  content: string;
  onCopy?: () => void;
  filename: string;
};

const DownloadButton: React.FC<SaveOptions> = props => {
  const {content, onCopy, filename} = props;
  const {setProcessed} = useDownloadFile(content, {
    filename,
  });

  const onClick = () => {
    setProcessed(true);
    onCopy?.();
  };

  return (
    <Tooltip title="Download">
      <StyledCopyOutlined onClick={onClick} />
    </Tooltip>
  );
};

export default DownloadButton;
