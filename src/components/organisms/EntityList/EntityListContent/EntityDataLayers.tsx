import React, {memo, useEffect} from 'react';
import {gql, useSubscription} from '@apollo/client';

import {OnDataChangeInterface} from '@models/onDataChange';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

type DataLayerProps = {
  onDataChange: (args: OnDataChangeInterface) => void;
  queryFilters?: any;
};

// TODO: Offset/Limit
const TEST_SUITES_SUBSCRIPTION = gql`
  subscription($statuses: [String!]!, $selectors: [String!]!, $query: String) {
    testSuitesWithExecutions(statuses: $statuses, selectors: $selectors, query: $query) {
      latestExecution {
        id duration durationMs startTime endTime name testSuiteName status
      }
      testSuite {
        created description name namespace labels
        status {
          latestExecution {
            id startTime endTime status
            executions {
              id name status testName type
            }
          }
        }
        steps {
          stopTestOnFailure
          execute { name namespace }
        }
      }
      metrics {
        executionDurationP50ms passFailRatio failedExecutions
        executions {
          duration durationMs name startTime status
        }
      }
    }
  }
`;

const TEST_SUBSCRIPTION = gql`
  subscription($statuses: [String!]!, $selectors: [String!]!, $query: String) {
    testsWithExecutions(statuses: $statuses, selectors: $selectors, query: $query) {
      latestExecution {
        id duration durationMs startTime endTime name testName status
      }
      test {
        content created description name namespace labels
        status {
          latestExecution {
            id startTime endTime status
          }
        }
      }
      metrics {
        executionDurationP50ms passFailRatio failedExecutions
        executions {
          duration durationMs name startTime status
        }
      }
    }
  }
`;

export const TestSuitesDataLayer: React.FC<DataLayerProps> = memo(props => {
  const {onDataChange, queryFilters} = props;

  // TODO: Apollo's bug atm, that it's not closing initial subscription if immediately variables are changed
  const { data: { testSuitesWithExecutions } = {}, loading, error } = useSubscription(TEST_SUITES_SUBSCRIPTION, {
    shouldResubscribe: true,
    variables: {
      statuses: queryFilters.status,
      selectors: queryFilters.selector,
      query: queryFilters.textSearch,
    },
  });

  useEffect(() => {
    if (error) {
      onDataChange({data: [], isLoading: false, isFetching: false, refetch: () => Promise.resolve()});
    } else {
      onDataChange({data: testSuitesWithExecutions || [], isLoading: loading, isFetching: loading, refetch: () => Promise.resolve()});
    }
  }, [testSuitesWithExecutions, loading]);

  return <></>;
});

export const TestsDataLayer: React.FC<DataLayerProps> = memo(props => {
  const {onDataChange, queryFilters} = props;

  const executors = useAppSelector(selectExecutors);

  // TODO: Apollo's bug atm, that it's not closing initial subscription if immediately variables are changed
  const { data: { testsWithExecutions } = {}, loading, error } = useSubscription(TEST_SUBSCRIPTION, {
    shouldResubscribe: true,
    variables: {
      statuses: queryFilters.status,
      selectors: queryFilters.selector,
      query: queryFilters.textSearch,
    },
  });

  useEffect(() => {
    if (error) {
      onDataChange({data: [], isLoading: false, isFetching: false, refetch: () => Promise.resolve()});
    } else {
      const mappedTests = (testsWithExecutions || []).map((test: any) => {
        const testIcon = getTestExecutorIcon(executors, test.test.type);

        return {
          ...test,
          test: {
            ...test.test,
            testIcon,
          },
        };
      });
      onDataChange({data: mappedTests, isLoading: loading, isFetching: loading, refetch: () => Promise.resolve()});
    }
  }, [testsWithExecutions, loading, error]);

  return <></>;
});
