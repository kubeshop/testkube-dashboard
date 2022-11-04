import {useContext} from 'react';

import {CopyButton, Pre} from '@atoms';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {LabelWrapper, StyledCopyCommandCode, StyledCopyCommandContainer} from './CopyCommand.styled';

type CopyCommandProps = {
  command: string;
  label?: string;
  showDollar?: boolean;
  bg?: string;
  isBordered?: boolean;
  additionalPrefix?: string;
};

const CopyCommand: React.FC<CopyCommandProps> = props => {
  const {command, label, showDollar = true, bg = Colors.slate900, isBordered = false, additionalPrefix} = props;

  const {ga4React} = useContext(MainContext);

  const onCopy = () => {
    if (ga4React) {
      ga4React.gtag('event', 'copy_command', {command: label});
    }
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
      <StyledCopyCommandContainer onClick={onCopy} $bg={bg} $isBordered={isBordered}>
        <Pre>
          <StyledCopyCommandCode>
            {showDollar ? <span>$</span> : null}
            {additionalPrefix ? <Text color={Colors.purple}>{additionalPrefix}</Text> : null}
            {command}
          </StyledCopyCommandCode>
        </Pre>
        <CopyButton content={command} onCopy={onCopy} />
      </StyledCopyCommandContainer>
    </>
  );
};

export default CopyCommand;
