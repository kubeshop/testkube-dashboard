import React from 'react';

import {Tooltip} from 'antd';

import {useDownloadFile} from '@hooks/useDownloadFile';

import {StyledCheckOutlined, StyledDownloadOutlined} from './DownloadButton.styled';

type SaveOptions = {
  content: string | (() => string);
  onClick?: () => void;
  filename?: string;
  extension: string;
};

const DownloadButton: React.FC<SaveOptions> = props => {
  const {content, onClick, filename = 'download', extension} = props;
  const {isProcessed, setProcessed} = useDownloadFile(content, {
    filename: `${filename}.${extension}`,
  });

  const onDownloadClick = () => {
    setProcessed(true);
    onClick?.();
  };

  return (
    <Tooltip title="Download">
      {isProcessed ? (
        <StyledCheckOutlined onClick={onDownloadClick} />
      ) : (
        <StyledDownloadOutlined onClick={onDownloadClick} />
      )}
    </Tooltip>
  );
};
export default DownloadButton;
