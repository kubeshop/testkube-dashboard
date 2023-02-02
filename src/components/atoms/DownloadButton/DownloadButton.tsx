import React from 'react';

import {Tooltip} from '@custom-antd';

import {useDownloadFile} from '@hooks/useDownloadFile';

import {StyledCopyOutlined, StyledDownloadOutlined} from './DownloadButton.styled';

type SaveOptions = {
  content: string;
  onClick?: () => void;
  filename: string;
};

const DownloadButton: React.FC<SaveOptions> = props => {
  const {content, onClick, filename} = props;
  const {setProcessed} = useDownloadFile(content, {
    filename,
  });

  const onDownloadClick = () => {
    setProcessed(true);
    onClick?.();
  };

  return (
    <Tooltip title="Download">
      <StyledDownloadOutlined onClick={onDownloadClick} />
    </Tooltip>
  );
};

export default DownloadButton;
