import {FC} from 'react';

import {Tooltip} from 'antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import {StyledCheckOutlined, StyledCopyOutlined} from './CopyButton.styled';

export const CopyButton: FC<{content: string | (() => string); onClick?: () => void}> = props => {
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
