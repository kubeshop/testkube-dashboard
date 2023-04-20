import React, {memo, useContext, useEffect} from 'react';

import {OnDataChangeInterface} from '@models/onDataChange';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuitesQuery} from '@services/testSuites';
import {useGetTestsQuery} from '@services/tests';

import {MainContext} from '@contexts';

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

export const TestsDataLayer: React.FC<DataLayerProps> = memo(props => {
  const {onDataChange, queryFilters} = props;
  const {isClusterAvailable} = useContext(MainContext);

  const executors = useAppSelector(selectExecutors);

  const {data, isLoading, isFetching, refetch, ...rest} = useGetTestsQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  useEffect(() => {
    if (rest.error) {
      onDataChange({data: [], isLoading: false, isFetching: false, refetch});
    } else {
      const mappedTests = (data || []).map(test => {
        const testIcon = getTestExecutorIcon(executors, test.test.type);

        return {
          ...test,
          test: {
            ...test.test,
            testIcon,
          },
        };
      });
      onDataChange({data: mappedTests, isLoading, isFetching, refetch});
    }
  }, [data, isLoading, isFetching, rest.error]);

  return <></>;
});
