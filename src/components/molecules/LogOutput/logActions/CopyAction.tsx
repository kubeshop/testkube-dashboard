import {CopyOutlined} from '@ant-design/icons';

import {Tooltip} from '@custom-antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import Colors from '@styles/Colors';

import {LogActionProps} from '../LogOutput';
import {StyledActionIconContainer} from '../LogOutput.styled';

const CopyAction: React.FC<LogActionProps> = props => {
  const {logOutput} = props;

  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(logOutput);

  const onCopy = () => {
    setCopyToClipboardState(true);
  };

  const tooltipTitle = isCopied ? 'Copied' : 'Copy';

  return (
    <StyledActionIconContainer onClick={onCopy}>
      <Tooltip title={tooltipTitle}>
        <CopyOutlined onClick={onCopy} style={{color: Colors.slate200}} />
      </Tooltip>
    </StyledActionIconContainer>
  );
};

export default CopyAction;
