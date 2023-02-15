import React, {useContext} from 'react';

import {CopyButton, Pre} from '@atoms';
import DownloadButton from '@atoms/DownloadButton/DownloadButton';

import {Text} from '@custom-antd';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {LabelWrapper, StyledCopyCommandCode, StyledCopyCommandContainer} from './CopyCommand.styled';

type CopyCommandProps = {
  additionalPrefix?: string;
  bg?: string;
  command: string;
  isBordered?: boolean;
  label?: string;
  showDollar?: boolean;
};

const CopyCommand: React.FC<CopyCommandProps> = props => {
  const {command, label, showDollar = true, bg = Colors.slate900, isBordered = false, additionalPrefix} = props;

  const {ga4React} = useContext(MainContext);
  const isSecureContext = useSecureContext();
  const filename = useLocation().lastPathSegment;

  const onClick = () => {
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
      <StyledCopyCommandContainer onClick={onClick} $bg={bg} $isBordered={isBordered}>
        <Pre>
          <StyledCopyCommandCode>
            {showDollar ? <span>$</span> : null}
            {additionalPrefix ? <Text color={Colors.purple}>{additionalPrefix}</Text> : null}
            {command}
          </StyledCopyCommandCode>
        </Pre>
        {isSecureContext ? (
          <CopyButton content={command} onClick={onClick} />
        ) : (
          <DownloadButton filename={filename} extension="sh" content={command} onClick={onClick} />
        )}
      </StyledCopyCommandContainer>
    </>
  );
};

export default CopyCommand;
