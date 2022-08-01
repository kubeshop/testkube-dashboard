import {useContext} from 'react';

import {CopyOutlined} from '@ant-design/icons';

import {Pre} from '@atoms';

import {Text} from '@custom-antd';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {LabelWrapper, StyledCopyCommandCode, StyledCopyCommandContainer} from './CopyCommand.styled';

type CopyCommandProps = {
  command: string;
  label?: string;
  showDollar?: boolean;
  bg?: string;
};

const CopyCommand: React.FC<CopyCommandProps> = props => {
  const {command, label, showDollar = true, bg = Colors.slate900} = props;

  const {ga4React} = useContext(MainContext);

  const {setCopyToClipboardState} = useCopyToClipboard(command);

  const onCopy = () => {
    if (ga4React) {
      ga4React.gtag('event', 'copy_command', {command: label});
    }

    setCopyToClipboardState(true);
  };

  return (
    <>
      {label ? (
        <LabelWrapper>
          <Text className="normal middle" color={Colors.slate50}>
            {label}
          </Text>
        </LabelWrapper>
      ) : null}
      <StyledCopyCommandContainer onClick={onCopy} $bg={bg}>
        <Pre>
          <StyledCopyCommandCode>
            {showDollar ? <span>$</span> : null}
            {command}
          </StyledCopyCommandCode>
        </Pre>
        <CopyOutlined onClick={onCopy} style={{color: Colors.slate200halfalpha}} />
      </StyledCopyCommandContainer>
    </>
  );
};

export default CopyCommand;
