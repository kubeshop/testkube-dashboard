import {useEffect, useState} from 'react';

type Query = Partial<{
  path: string;
  lastPathSegment: string;
}>;

const useQueryParams = () => {
  const [query, setQuery] = useState<Query>({
    path: '',
    lastPathSegment: '',
  });

  useEffect(() => {
    setQuery({
      path: location.pathname,
      lastPathSegment: location.pathname.split('/')?.pop(),
    });
  }, [window.location.pathname]);
  return query;
};

export default useQueryParams;
