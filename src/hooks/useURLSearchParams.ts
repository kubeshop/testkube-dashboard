import {useContext, useMemo} from 'react';

import qs from 'query-string';

import {MainContext} from '@contexts';

const useURLSearchParams = () => {
  const {location} = useContext(MainContext);

  const {search} = location;

  const urlSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  return qs.parse(urlSearchParams.toString());
};

export default useURLSearchParams;
