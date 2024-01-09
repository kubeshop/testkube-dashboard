import React, {Fragment, createElement, memo, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

import {useSearch} from '@molecules/LogOutput/useSearch';

import {useTestsSlot} from '@plugins/tests-and-test-suites/hooks';

import {useLogOutputField, useLogOutputPick, useLogOutputSync} from '@store/logOutput';

import FullscreenLogOutput from './FullscreenLogOutput';
import {LogOutputWrapper} from './LogOutput.styled';
import LogOutputPure, {LogOutputPureRef} from './LogOutputPure';
import {LogOutputProps, useLogOutput} from './useLogOutput';

const LogOutput: React.FC<LogOutputProps> = props => {
  const logRef = useRef<LogOutputPureRef>(null);
  const options = useLogOutput(props);
  const {isFullscreen} = useLogOutputPick('isFullscreen');
  const fullscreenContainer = document.querySelector('#log-output-container')!;

  // Search logic
  const [, setSearching] = useLogOutputField('searching');
  const [searchQuery] = useLogOutputField('searchQuery');

  useEffect(() => {
    if (!searchQuery) {
      setSearching(false);
    }
  }, [searchQuery, setSearching]);

  const search = useSearch({searchQuery, output: options.logs});
  useLogOutputSync({
    searching: search.loading,
    searchResults: search.list,
    searchLinesMap: search.map,
  });

  const [searchIndex, setSearchIndex] = useLogOutputField('searchIndex');
  useEffect(() => {
    if (search.list.length === 0) {
      // Do nothing
    } else if (searchIndex >= search.list.length) {
      setSearchIndex(0);
    } else {
      const highlight = search.list[searchIndex];
      logRef.current?.console?.scrollToLine(highlight.line);
    }
  }, [searchIndex, searchQuery, search.loading, logRef.current?.console]);

  return (
    <>
      <LogOutputWrapper>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {useTestsSlot('logOutputTop').map((element, i) => createElement(Fragment, {key: i}, element))}
        <LogOutputPure ref={logRef} {...options} />
      </LogOutputWrapper>
      {isFullscreen ? createPortal(<FullscreenLogOutput {...options} />, fullscreenContainer) : null}
    </>
  );
};

export default memo(LogOutput);
