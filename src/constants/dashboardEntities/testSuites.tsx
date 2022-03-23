import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllTestSuitesFilters,
  selectSelectedTestSuite,
  selectTestSuites,
  selectTestSuitesFilters,
  setSelectedTestSuite,
  setTestSuites,
  setTestSuitesFilters,
} from '@redux/reducers/testSuitesSlice';

import {useGetTestSuitesQuery} from '@services/testSuites';

import {testSuitesDashboardGradient} from '@styles/gradients';

export const TestSuitesEntity: DashboardBlueprint = {
  entityType: 'test-suites',
  dashboardGradient: testSuitesDashboardGradient,
  route: '/dashboard/test-suites',
  reduxEntity: 'testSuites',
  pageTitle: 'Test Suites',
  hasInfoPanel: true,
  reduxListName: 'dataList',
  canSelectRow: true,
  emptyDrawerEntity: 'test suite',

  useGetData: useGetTestSuitesQuery,
  setData: setTestSuites,
  selectData: selectTestSuites,

  setQueryFilters: setTestSuitesFilters,
  selectQueryFilters: selectTestSuitesFilters,
  selectAllFilters: selectAllTestSuitesFilters,

  setSelectedRecord: setSelectedTestSuite,
  selectSelectedRecord: selectSelectedTestSuite,

  selectedRecordIdFieldName: 'name',

  columns: [
    {
      title: 'Test suite name',
      render: (data: any) => data?.name,
      key: 'testName',
    },
    {
      title: 'Namespace',
      render: (data: any) => data?.namespace,
      key: 'testNamespace',
    },
    {
      title: 'Test suite description',
      render: (data: any) => data?.description,
      key: 'testDescription',
    },
    {
      title: 'Test suite labels',
      render: (data: any) => {
        if (!data.labels) {
          return <span> - </span>;
        }

        return (
          <div>
            <span>{data.labels.join(', ')}</span>
          </div>
        );
      },
    },
    {
      title: 'Number of steps',
      render: (data: any) => {
        return <span>{data?.steps?.length}</span>;
      },
      key: 'testNumberOfSteps',
    },
    {
      title: 'Number of executions',
      render: (data: any) => data?.repeats,
      key: 'testNumberOfExecutions',
    },
  ],
  filtersComponentsIds: ['textSearch'],
};

export default TestSuitesEntity;
