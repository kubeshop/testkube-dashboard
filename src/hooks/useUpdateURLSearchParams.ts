import {useContext, useEffect} from 'react';

import {paramsSerializer} from '@utils/fetchUtils';

import {MainContext} from '@contexts';

const prohibitedSearchParams = ['page', 'pageSize'];

const useUpdateURLSearchParams = (filters: any) => {
  const {navigate, location} = useContext(MainContext);

  const {pathname, search} = location;

  const updateURLQueryParams = () => {
    const searchParams = new URLSearchParams(search);

    Object.entries(filters).forEach(([key, value]: any) => {
      if (prohibitedSearchParams.includes(key)) {
        return;
      }

      searchParams.set(key, value);
    });

    navigate(`${pathname}?${paramsSerializer(Object.fromEntries(searchParams))}`, {replace: true});
  };

  useEffect(() => {
    updateURLQueryParams();
  }, [filters]);
};

export default useUpdateURLSearchParams;
