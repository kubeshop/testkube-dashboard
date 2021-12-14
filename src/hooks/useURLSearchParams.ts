import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';

import qs from 'query-string';

const useURLSearchParams = () => {
  const {search} = useLocation();

  const urlSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  return qs.parse(urlSearchParams.toString());
};

export default useURLSearchParams;
