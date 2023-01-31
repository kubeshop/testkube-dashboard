import React, {useContext} from 'react';

import {CopyButton, Pre} from '@atoms';

import {Text} from '@custom-antd';

import useSecureContext from '@hooks/useSecureContext';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import DownloadButton from '@src/components/atoms/CopyButton/DownloadButton';

import {LabelWrapper, StyledCopyCommandCode, StyledCopyCommandContainer} from './CopyCommand.styled';

type CopyCommandProps = {
  additionalPrefix?: string;
  bg?: string;
  command: string;
  filename?: string;
  isBordered?: boolean;
  label?: string;
  showDollar?: boolean;
};

const CopyCommand: React.FC<CopyCommandProps> = props => {
  const {
    command,
    filename = 'command.sh',
    label,
    showDollar = true,
    bg = Colors.slate900,
    isBordered = false,
    additionalPrefix,
  } = props;

  const {ga4React} = useContext(MainContext);
  const isSecureContext = useSecureContext();

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
        {isSecureContext ? (
          <CopyButton content={command} onCopy={onCopy} />
        ) : (
          <DownloadButton filename={filename} content={command} onCopy={onCopy} />
        )}
      </StyledCopyCommandContainer>
    </>
  );
};

export default CopyCommand;
