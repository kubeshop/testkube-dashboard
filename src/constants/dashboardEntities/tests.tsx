import {Link} from 'react-router-dom';

import {Button} from 'antd';

import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllTestsFilters,
  selectFilters,
  selectSelectedTest,
  selectTests,
  setFilters,
  setSelectedTest,
  setTests,
} from '@redux/reducers/testsSlice';

import TestsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestsInfoPanel';

import {useGetTestsQuery} from '@services/tests';

export const TestsEntity: DashboardBlueprint = {
  entityType: 'tests',
  route: '/dashboard/tests',
  reduxEntity: 'tests',
  pageTitle: 'Tests',
  hasInfoPanel: true,
  reduxListName: 'testsList',
  canSelectRow: true,

  infoPanelComponent: TestsInfoPanel,

  useGetData: useGetTestsQuery,
  setData: setTests,
  selectData: selectTests,

  setQueryFilters: setFilters,
  selectQueryFilters: selectFilters,
  selectAllFilters: selectAllTestsFilters,

  setSelectedRecord: setSelectedTest,
  selectSelectedRecord: selectSelectedTest,

  selectedRecordIdFieldName: 'name',

  columns: [
    {
      title: 'Test name',
      render: (data: any) => data?.name,
      key: 'testName',
    },
    {
      title: 'Namespace',
      render: (data: any) => data?.namespace,
      key: 'testNamespace',
    },
    {
      title: 'Test description',
      render: (data: any) => data?.description,
      key: 'testDescription',
    },
    {
      title: 'Test tags',
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
    {
      title: '',
      dataIndex: 'name',
      render: (name: any) => {
        return (
          <Button type="primary" ghost>
            <Link to={`/dashboard/test-executions?textSearch=${name}`}>Show test executions</Link>
          </Button>
        );
      },
      width: '25%',
    },
  ],
  filtersComponentsIds: ['textSearch', 'tags'],
};

export default TestsEntity;
