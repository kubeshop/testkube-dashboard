import {FC, useContext, useMemo} from 'react';

import {ExternalLink} from '@atoms';

import {EntityListContext, MainContext} from '@contexts';

import {EntityListContent} from '@organisms';

import {useAppSelector} from '@redux/hooks';
import {initialTestsFiltersState} from '@redux/initialState';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {
  selectAllTestsFilters,
  selectTests,
  selectTestsFilters,
  setTests,
  setTestsFilters,
} from '@redux/reducers/testsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useAbortAllTestExecutionsMutation, useGetTestExecutionMetricsQuery, useGetTestsQuery} from '@services/tests';

import {externalLinks} from '@utils/externalLinks';
import {PollingIntervals} from '@utils/numbers';

import EmptyTests from './EmptyTests';

const PageDescription: FC = () => (
  <>
    Explore your tests at a glance... Learn more about{' '}
    <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
  </>
);

const TestsList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const queryFilters = useAppSelector(selectTestsFilters);
  const executors = useAppSelector(selectExecutors); // FIXME: Get rid of executors necessity

  const {
    data: _data,
    isLoading,
    isFetching,
  } = useGetTestsQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });
  const data = useMemo(
    () =>
      (_data || []).map(test => ({
        ...test,
        test: {...test.test, testIcon: getTestExecutorIcon(executors, test.test.type)},
      })),
    [_data]
  );

  return (
    <EntityListContext.Provider
      value={{
        entity: 'tests',
        queryFilters,
        dataSource: useAppSelector(selectTests),
        allFilters: useAppSelector(selectAllTestsFilters),
        setQueryFilters: setTestsFilters,
        useGetMetrics: useGetTestExecutionMetricsQuery,
        useAbortAllExecutions: useAbortAllTestExecutionsMutation,
      }}
    >
      <EntityListContent
        entity="tests"
        route="/dashboard/tests"
        reduxSliceName="tests"
        pageTitle="Tests"
        addEntityButtonText="Add a new test"
        pageDescription={PageDescription}
        emptyDataComponent={EmptyTests}
        setData={setTests}
        initialFiltersState={initialTestsFiltersState}
        dataTestID="add-a-new-test-btn"
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </EntityListContext.Provider>
  );
};

export default TestsList;
