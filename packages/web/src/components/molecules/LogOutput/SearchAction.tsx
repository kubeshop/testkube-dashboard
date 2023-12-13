import {ChangeEvent, FC, KeyboardEvent, useLayoutEffect, useRef, useState} from 'react';
import {useUnmount, useUpdate} from 'react-use';

import {DownOutlined, LoadingOutlined, UpOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

import {useEventCallback} from '@hooks/useEventCallback';
import {useLastCallback} from '@hooks/useLastCallback';

import {useLogOutputField} from '@store/logOutput';

import {
  SearchArrowButton,
  StyledSearchContainer,
  StyledSearchInput,
  StyledSearchOutlined,
  StyledSearchResults,
} from './LogOutput.styled';

const SearchAction: FC = () => {
  const [query, setQuery] = useLogOutputField('searchQuery');
  const [index, setIndex] = useLogOutputField('searchIndex');
  const [searching] = useLogOutputField('searching');
  const [results] = useLogOutputField('searchResults');
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const inputRef = useRef<HTMLInputElement>(null);

  const prev = () => setIndex(Math.max(0, index - 1) % results.length);
  const next = () => setIndex((index + 1) % results.length);

  const change = useLastCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIndex(0);
  });

  // Hook to Ctrl/Cmd+F
  useEventCallback('keydown', (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'f') {
      event.preventDefault();
      inputRef.current?.focus();
      setOpen(true);
    }
  });
  useEventCallback(
    'keydown',
    event => {
      const key = (event as unknown as KeyboardEvent).key;
      if (key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        setOpen(false);
      } else if (key === 'Enter') {
        event.preventDefault();
        event.stopImmediatePropagation();
        next();
      }
    },
    inputRef.current
  );

  useUnmount(() => {
    setQuery('');
  });

  // Re-render after opening the input to obtain reference
  useLayoutEffect(useUpdate(), [open]);

  const message =
    query === '' ? null : results.length > 0 ? (
      <>
        <StyledSearchResults>
          {index + 1} / {results.length}
        </StyledSearchResults>
        <SearchArrowButton onClick={prev}>
          <UpOutlined />
        </SearchArrowButton>
        <SearchArrowButton onClick={next}>
          <DownOutlined />
        </SearchArrowButton>
        {searching ? <LoadingOutlined /> : null}
      </>
    ) : searching ? (
      <LoadingOutlined />
    ) : (
      <StyledSearchResults>no results</StyledSearchResults>
    );

  return (
    <StyledSearchContainer>
      {message}
      {open ? <StyledSearchInput ref={inputRef} onChange={change} autoFocus /> : null}
      <Tooltip title="Search">
        <StyledSearchOutlined onClick={toggle} />
      </Tooltip>
    </StyledSearchContainer>
  );
};

export default SearchAction;
