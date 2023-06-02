import React, {memo, useContext, useEffect} from 'react';

import {MainContext} from '@contexts';

import {OnDataChangeInterface} from '@models/onDataChange';

import {useGetTestSuitesQuery} from '@services/testSuites';

import {PollingIntervals} from '@utils/numbers';

type DataLayerProps = {
  onDataChange: (args: OnDataChangeInterface) => void;
  queryFilters?: any;
};

export const TestSuitesDataLayer: React.FC<DataLayerProps> = memo(props => {
  const {onDataChange, queryFilters} = props;
  const {isClusterAvailable} = useContext(MainContext);

  const {data, isLoading, isFetching, refetch, ...rest} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  useEffect(() => {
    if (rest.error) {
      onDataChange({data: [], isLoading: false, isFetching: false, refetch});
    } else {
      onDataChange({data: data || [], isLoading, isFetching, refetch});
    }
  }, [data, isLoading, isFetching]);

  return <></>;
});
