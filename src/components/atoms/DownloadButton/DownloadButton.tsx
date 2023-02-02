import React from 'react';

import {Tooltip} from '@custom-antd';

import {useDownloadFile} from '@hooks/useDownloadFile';

import {StyledDownloadOutlined} from './DownloadButton.styled';

type SaveOptions = {
  content: string;
  onClick?: () => void;
  filename?: string;
  extension: string;
};

const DownloadButton: React.FC<SaveOptions> = props => {
  const {content, onClick, filename = 'download', extension} = props;
  const {setProcessed} = useDownloadFile(content, {
    filename: `${filename}.${extension}`,
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
