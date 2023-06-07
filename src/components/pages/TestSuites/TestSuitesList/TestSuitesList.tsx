import {FC, useContext} from 'react';

import {MainContext} from '@contexts';

import {EntityListContent} from '@organisms';

import {useAppSelector} from '@redux/hooks';
import {initialTestSuitesFiltersState} from '@redux/initialState';
import {
  selectTestSuites,
  selectTestSuitesFilters,
  setTestSuites,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';

import {useGetTestSuitesQuery} from '@services/testSuites';

import {PollingIntervals} from '@utils/numbers';

import EmptyTestSuites from './EmptyTestSuites';
import TestSuiteCard from './TestSuiteCard';

const PageDescription: FC = () => <>Explore your test suites at a glance...</>;

const TestSuitesList: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const queryFilters = useAppSelector(selectTestSuitesFilters);

  const {data, isLoading, isFetching} = useGetTestSuitesQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  return (
    <EntityListContent
      CardComponent={TestSuiteCard}
      entity="test-suites"
      route="/dashboard/test-suites"
      pageTitle="Test Suites"
      addEntityButtonText="Add a new test suite"
      pageDescription={PageDescription}
      emptyDataComponent={EmptyTestSuites}
      setData={setTestSuites}
      initialFiltersState={initialTestSuitesFiltersState}
      dataTestID="add-a-new-test-suite-btn"
      queryFilters={queryFilters}
      setQueryFilters={setTestSuitesFilters}
      dataSource={useAppSelector(selectTestSuites)}
      data={data || []}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default TestSuitesList;
