import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {paramsSerializer} from '@utils/fetchUtils';

const prohibitedSearchParams = ['page', 'pageSize'];

const useUpdateURLSearchParams = (filters: any) => {
  const navigate = useNavigate();
  const {pathname, search} = useLocation();

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
