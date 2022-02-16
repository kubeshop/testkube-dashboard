import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllTestsSuitesFilters,
  selectSelectedTestSuite,
  selectTestsSuites,
  selectTestsSuitesFilters,
  setSelectedTestSuite,
  setTestsSuites,
  setTestsSuitesFilters,
} from '@redux/reducers/testsSuitesSlice';

import TestsSuitesInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestsSuitesInfoPanel';

import {useGetTestsSuitesQuery} from '@services/testsSuites';

export const TestsSuitesEntity: DashboardBlueprint = {
  entityType: 'tests-suites',
  route: '/dashboard/tests-suites',
  reduxEntity: 'testsSuites',
  pageTitle: 'Tests Suites',
  hasInfoPanel: true,
  reduxListName: 'dataList',
  canSelectRow: true,

  infoPanelComponent: TestsSuitesInfoPanel,

  useGetData: useGetTestsSuitesQuery,
  setData: setTestsSuites,
  selectData: selectTestsSuites,

  setQueryFilters: setTestsSuitesFilters,
  selectQueryFilters: selectTestsSuitesFilters,
  selectAllFilters: selectAllTestsSuitesFilters,

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

export default TestsSuitesEntity;
