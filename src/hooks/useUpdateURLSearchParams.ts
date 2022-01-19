import {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {paramsSerializer} from '@utils/fetchUtils';

const prohibitedSearchParams = ['page', 'pageSize'];

const useUpdateURLSearchParams = (filters: any) => {
  const history = useHistory();
  const {pathname, search} = useLocation();

  const updateURLQueryParams = () => {
    const searchParams = new URLSearchParams(search);

    Object.entries(filters).forEach(([key, value]: any) => {
      if (prohibitedSearchParams.includes(key)) {
        return;
      }

      searchParams.set(key, value);
    });

    history.replace(`${pathname}?${paramsSerializer(Object.fromEntries(searchParams))}`);
  };

  useEffect(() => {
    updateURLQueryParams();
  }, [filters]);
};

export default useUpdateURLSearchParams;
