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

import TestSuitesInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestSuitesInfoPanel';

import {useGetTestSuitesQuery} from '@services/testSuites';

export const TestSuitesEntity: DashboardBlueprint = {
  entityType: 'test-suites',
  route: '/dashboard/test-suites',
  reduxEntity: 'testSuites',
  pageTitle: 'Test Suites',
  hasInfoPanel: true,
  reduxListName: 'dataList',
  canSelectRow: true,

  infoPanelComponent: TestSuitesInfoPanel,

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
      title: 'Test suite tags',
      render: (data: any) => {
        if (!data.tags) {
          return <span> - </span>;
        }

        return (
          <div>
            <span>{data.tags.join(', ')}</span>
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
  filtersComponentsIds: ['textSearch', 'tags'],
};

export default TestSuitesEntity;
