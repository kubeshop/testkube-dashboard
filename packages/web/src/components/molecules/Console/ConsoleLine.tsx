import {FC, PropsWithChildren, memo} from 'react';

import {SearchResult, useLogOutput} from '@store/logOutput';

import * as S from './Console.styled';
import {Highlight} from './Highlight';

const EMPTY: SearchResult[] = [];

export const ConsoleLine: FC<PropsWithChildren<{number: number}>> = memo(({number, children}) => {
  const {queryLength, results, selected} = useLogOutput(x => ({
    queryLength: x.searchQuery.length,
    results: x.searchLinesMap[number] || EMPTY,
    selected: x.searchResults[x.searchIndex]?.line === number,
  }));

  return (
    <S.Line $highlighted={selected}>
      <Highlight highlights={queryLength === 0 ? undefined : results}>{children}</Highlight>
      {'\n'}
    </S.Line>
  );
});
