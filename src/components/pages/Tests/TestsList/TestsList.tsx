import {FC, useMemo} from 'react';

import {ExternalLink} from '@atoms';

import {EntityListContainer} from '@organisms';

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
  <EntityListContainer
    entity="tests"
    route="/dashboard/tests"
    reduxSliceName="tests"
    pageTitle="Tests"
    addEntityButtonText="Add a new test"
    pageDescription={PageDescription}
    emptyDataComponent={EmptyTests}
    useGetData={useGetTestsQuery}
    useGetMetrics={useGetTestExecutionMetricsQuery}
    useAbortAllExecutions={useAbortAllTestExecutionsMutation}
    setData={setTests}
    selectData={selectTests}
    setQueryFilters={setTestsFilters}
    selectQueryFilters={selectTestsFilters}
    selectAllFilters={selectAllTestsFilters}
    initialFiltersState={initialTestsFiltersState}
    filtersComponentsIds={useMemo(() => ['textSearch', 'selector', 'status'], [])}
    dataTestID="add-a-new-test-btn"
  />
);

export default TestsList;
