import React, {useCallback, useMemo, useRef} from 'react';

import {CopyButton, DownloadButton, Pre} from '@atoms';

import {Text} from '@custom-antd';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import {getLiteralColor} from '@models/command';

import Colors from '@styles/Colors';

import {LabelWrapper, StyledCopyCommandCode, StyledCopyCommandContainer} from './CopyCommand.styled';

type CopyCommandProps = {
  command: string;
  additionalPrefix?: string;
  bg?: string;
  isBordered?: boolean;
  label?: string;
  showDollar?: boolean;
  highlightSyntax?: boolean;
  onCopy?: () => void;
  enabled?: boolean;
};

// TODO consider refactoring to a more generic component. (i.e. not specific to CLI commands)
const CopyCommand: React.FC<CopyCommandProps> = props => {
  const {
    command,
    label,
    showDollar = true,
    bg = Colors.slate900,
    isBordered = false,
    highlightSyntax = false,
    additionalPrefix,
    onCopy,
    enabled = true,
  } = props;

  const contentRef = useRef(null);

  const isSecureContext = useSecureContext();
  const filename = useLocation().lastPathSegment;

  const content = useMemo(() => {
    if (command === '') {
      return null;
    }
    if (!highlightSyntax) {
      return <span style={{color: Colors.whitePure}}>{command}</span>;
    }

    return command.split(/\s+/g).map((word, index, words) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={`${word}_${index}`} style={{color: getLiteralColor(word)}}>
        {word}
        {words.length === index + 1 ? '' : ' '}
      </span>
    ));
  }, [highlightSyntax, command]);

  const onDoubleClick = useCallback(() => {
    const target = contentRef?.current;
    if (!target) {
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(target);

    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [contentRef?.current]);

  return (
    <>
      {label ? (
        <LabelWrapper>
          <Text className="normal middle" color={Colors.slate50}>
            {label}
          </Text>
        </LabelWrapper>
      ) : null}
      <StyledCopyCommandContainer $bg={bg} $isBordered={isBordered}>
        <Pre>
          <StyledCopyCommandCode data-test="command-to-copy" onDoubleClick={onDoubleClick}>
            {showDollar ? <span>$</span> : null}
            {additionalPrefix ? (
              <Text className="regular" color={Colors.purple}>
                {additionalPrefix}
              </Text>
            ) : null}
            {content ? <span ref={contentRef}>{content}</span> : null}
          </StyledCopyCommandCode>
        </Pre>
        {enabled ? (
          <>
            {isSecureContext ? (
              <CopyButton content={command} onClick={onCopy} />
            ) : (
              <DownloadButton filename={filename} extension="sh" content={command} onClick={onCopy} />
            )}
          </>
        ) : null}
      </StyledCopyCommandContainer>
    </>
  );
};

export default CopyCommand;
