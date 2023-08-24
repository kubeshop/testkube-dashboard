/* eslint no-restricted-globals: 0 */
import {useEffect, useState} from 'react';

type Query = {
  path: string;
  lastPathSegment: string;
};

export const useLocation = (): Query => {
  const [query, setQuery] = useState<Query>({
    path: '',
    lastPathSegment: '',
  });

  useEffect(() => {
    setQuery({
      path: location.pathname ?? '',
      lastPathSegment: location.pathname.split('/')?.pop() ?? '',
    });
  }, [window.location]);
  return query;
};
