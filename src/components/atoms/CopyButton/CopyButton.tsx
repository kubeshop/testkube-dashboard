import {Tooltip} from '@custom-antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import {StyledCheckOutlined, StyledCopyOutlined} from './CopyButton.styled';

const CopyButton: React.FC<{content: string; onCopy?: () => void}> = props => {
  const {content, onCopy} = props;
  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(content);

  const handleIconClick = () => {
    setCopyToClipboardState(true);
    if (onCopy) {
      onCopy();
    }
  };

  return (
    <Tooltip title={isCopied ? 'Copied' : 'Copy'}>
      {isCopied ? <StyledCheckOutlined onClick={handleIconClick} /> : <StyledCopyOutlined onClick={handleIconClick} />}
    </Tooltip>
  );
};

export default CopyButton;
