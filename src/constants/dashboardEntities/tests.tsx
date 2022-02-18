/* eslint-disable unused-imports/no-unused-imports-ts */

/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from 'react';
import {Link} from 'react-router-dom';

import {Dropdown, Menu} from 'antd';

import {DashboardBlueprint} from '@models/dashboard';
import {MenuItem} from '@models/menu';

import {Dots, TableActionsDropdownContainer} from '@atoms';

import {InfoPanelHeader} from '@molecules';

import TestsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/TestsInfoPanel';

import {timeStampToDate} from '@utils/formatDate';

import {
  selectAllTestsFilters,
  selectSelectedTest,
  selectTests,
  selectTestsFilters,
  setSelectedTest,
  setTests,
  setTestsFilters,
} from '@src/redux/reducers/testsSlice';
import {useGetTestsQuery} from '@src/services/tests';

const ScriptsActions: React.FC<any> = props => {
  const {scriptName, setVisibilityState} = props;

  const onMenuClick = () => {};

  const menuActions: any = {
    startScriptCommand: () => {
      const textToCopy = `kubectl testkube scripts start  ${scriptName}`;

      navigator.clipboard.writeText(textToCopy);
    },
    deleteScriptCommand: () => {
      const textToCopy = `kubectl testkube scripts delete ${scriptName}`;

      navigator.clipboard.writeText(textToCopy);
    },
  };

  const onMenuItemClick = (menuItem: MenuItem) => {
    const {domEvent, key} = menuItem;

    domEvent.stopPropagation();

    menuActions[key]();

    setVisibilityState(false);
  };

  const onVisibleChange = (state: any) => {
    setVisibilityState(state);
  };

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="startScriptCommand" onClick={onMenuItemClick}>
        Start script command
      </Menu.Item>
      <Menu.Item key="deleteScriptCommand" onClick={onMenuItemClick}>
        Delete script command
      </Menu.Item>
      <Menu.Item key="showScriptExecutions">
        <Link to={`/dashboard/executions?scriptName=${scriptName}`}>Show script executions</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onVisibleChange={onVisibleChange}>
      <div onClick={e => e.stopPropagation()} style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
        <Dots />
      </div>
    </Dropdown>
  );
};

export const TestsEntity: DashboardBlueprint = {
  entityType: 'tests',
  route: '/dashboard/tests',
  reduxEntity: 'tests',
  pageTitle: 'Tests',
  hasInfoPanel: true,
  reduxListName: 'dataList',
  canSelectRow: true,

  infoPanelComponent: TestsInfoPanel,

  useGetData: useGetTestsQuery,
  setData: setTests,
  selectData: selectTests,

  setQueryFilters: setTestsFilters,
  selectQueryFilters: selectTestsFilters,
  selectAllFilters: selectAllTestsFilters,

  setSelectedRecord: setSelectedTest,
  selectSelectedRecord: selectSelectedTest,

  selectedRecordIdFieldName: 'name',
  testTypeFieldName: 'type',

  columns: [
    {
      title: 'Test name',
      dataIndex: 'name',
    },
    {title: 'Test type', dataIndex: 'type', key: 'type'},
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
      title: 'Created at',
      dataIndex: 'created',
      render: (created: string) => timeStampToDate(created),
    },
    // {
    //   title: 'Actions',
    //   align: 'center',
    //   render: (data: any) => {
    //     const {name} = data;

    //     const [isDropdownVisible, setVisibilityState] = useState(false);

    //     return (
    //       <TableActionsDropdownContainer isDropdownVisible={isDropdownVisible}>
    //         <ScriptsActions scriptName={name} setVisibilityState={setVisibilityState} />
    //       </TableActionsDropdownContainer>
    //     );
    //   },
    //   className: 'dropdown-actions-menu',
    // },
    {},
  ],
  filtersComponentsIds: ['textSearch', 'scriptType', 'date', 'tags'],
  infoPanelConfig: [
    {type: 'header', name: 'Scripts', component: InfoPanelHeader},
    {
      type: 'summary',
      name: 'summary',
      component: TestsInfoPanel,
    },
  ],
};

export default TestsEntity;
