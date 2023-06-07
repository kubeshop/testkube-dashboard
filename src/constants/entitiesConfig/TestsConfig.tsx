import {ExternalLink} from '@atoms';

import {EntityListBlueprint} from '@models/entity';

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

import {EmptyTestsListContent} from './EmptyEntitiesListContent';

const TestsPageDescription: React.FC = () => {
  return (
    <>
      Explore your tests at a glance... Learn more about{' '}
      <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
    </>
  );
};

export const TestsEntity: EntityListBlueprint = {
  entity: 'tests',
  route: '/dashboard/tests',
  reduxSliceName: 'tests',
  pageTitle: 'Tests',
  addEntityButtonText: 'Add a new test',
  pageDescription: TestsPageDescription,
  emptyDataComponent: EmptyTestsListContent,

  useGetData: useGetTestsQuery,
  useGetMetrics: useGetTestExecutionMetricsQuery,
  useAbortAllExecutions: useAbortAllTestExecutionsMutation,
  setData: setTests,
  selectData: selectTests,

  setQueryFilters: setTestsFilters,
  selectQueryFilters: selectTestsFilters,
  selectAllFilters: selectAllTestsFilters,
  initialFiltersState: initialTestsFiltersState,

  filtersComponentsIds: ['textSearch', 'selector', 'status'],
  dataTestID: 'add-a-new-test-btn',
};

export default TestsEntity;
