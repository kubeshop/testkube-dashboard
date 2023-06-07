import {FC} from 'react';

import {ExternalLink} from '@atoms';

import {EntityListContext} from '@contexts';

import {EntityListContent} from '@organisms';

import {useAppSelector} from '@redux/hooks';
import {initialTestsFiltersState} from '@redux/initialState';
import {
  selectAllTestsFilters,
  selectTests,
  selectTestsFilters,
  setTests,
  setTestsFilters,
} from '@redux/reducers/testsSlice';

import {useAbortAllTestExecutionsMutation, useGetTestExecutionMetricsQuery, useGetTestsQuery} from '@services/tests';

import {externalLinks} from '@utils/externalLinks';

import EmptyTests from './EmptyTests';

const PageDescription: FC = () => (
  <>
    Explore your tests at a glance... Learn more about{' '}
    <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
  </>
);

const TestsList: FC = () => (
  <EntityListContext.Provider
    value={{
      entity: 'tests',
      dataSource: useAppSelector(selectTests),
      queryFilters: useAppSelector(selectTestsFilters),
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
      useGetData={useGetTestsQuery}
      setData={setTests}
      initialFiltersState={initialTestsFiltersState}
      dataTestID="add-a-new-test-btn"
    />
  </EntityListContext.Provider>
);

export default TestsList;
