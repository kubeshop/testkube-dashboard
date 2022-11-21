import React, {memo, useEffect} from 'react';

import {OnDataChangeInterface} from '@models/onDataChange';

import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuitesQuery} from '@services/testSuites';
import {useGetTestsQuery} from '@services/tests';

type DataLayerProps = {
  onDataChange: (args: OnDataChangeInterface) => void;
  queryFilters?: any;
};

export const TestSuitesDataLayer: React.FC<DataLayerProps> = memo(props => {
  const {onDataChange, queryFilters} = props;

  const {data, isLoading, isFetching, refetch, ...rest} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
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

export const TestsDataLayer: React.FC<DataLayerProps> = memo(props => {
  const {onDataChange, queryFilters} = props;

  const {data, isLoading, isFetching, refetch, ...rest} = useGetTestsQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    if (rest.error) {
      onDataChange({data: [], isLoading: false, isFetching: false, refetch});
    } else {
      onDataChange({data: data || [], isLoading, isFetching, refetch});
    }
  }, [data, isLoading, isFetching, rest.error]);

  return <></>;
});
