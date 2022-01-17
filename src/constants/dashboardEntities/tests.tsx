import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllTestsFilters,
  selectFilters,
  selectSelectedTest,
  selectTests,
  setSelectedTest,
  setTests,
} from '@redux/reducers/testsSlice';

import {TestsFilters} from '@molecules/Filters';

import TestsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestsInfoPanel';

import {useGetTestsQuery} from '@services/tests';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

export const TestsEntity: DashboardBlueprint = {
  entityType: 'tests',
  route: '/dashboard/tests',
  reduxEntity: 'tests',
  pageTitle: 'Tests',
  hasInfoPanel: true,
  reduxListName: 'testsList',
  canSelectRow: true,

  filtersComponent: TestsFilters,
  infoPanelComponent: TestsInfoPanel,

  useGetData: useGetTestsQuery,
  setData: setTests,
  selectData: selectTests,

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
            <NavLink to={`/dashboard/test-executions?textSearch=${name}`}>Show test executions</NavLink>
          </Button>
        );
      },
      width: '25%',
    },
  ],
};

export default TestsEntity;
