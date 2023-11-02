import {useMemo} from 'react';

import qs from 'query-string';

import {useRouterPlugin} from '@plugins/router/hooks';

const useURLSearchParams = () => {
  const {location} = useRouterPlugin.pick('location');
  const {search} = location;

  const query = useMemo(() => new URLSearchParams(search).toString(), [search]);
  return qs.parse(query);
};

export default useURLSearchParams;
