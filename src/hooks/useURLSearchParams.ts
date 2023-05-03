import {useContext, useMemo} from 'react';

import qs from 'query-string';

import {DashboardContext} from '@contexts';

const useURLSearchParams = () => {
  const {location} = useContext(DashboardContext);
  const {search} = location;

  const query = useMemo(() => new URLSearchParams(search).toString(), [search]);
  return qs.parse(query);
};

export default useURLSearchParams;
