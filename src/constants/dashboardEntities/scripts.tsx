/* eslint-disable unused-imports/no-unused-imports-ts */

/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from 'react';
import {Link} from 'react-router-dom';

import {Dropdown, Menu} from 'antd';

import {DashboardBlueprint} from '@models/dashboard';
import {MenuItem} from '@models/menu';

import {
  selectAllScriptsFilters,
  selectFilters,
  selectScripts,
  selectSelectedScript,
  setFilters,
  setScripts,
  setSelectedScript,
} from '@redux/reducers/scriptsSlice';

import {Dots, TableActionsDropdownContainer} from '@atoms';

import {InfoPanelHeader} from '@molecules';

import ScriptsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/ScriptsInfoPanel';

import {timeStampToDate} from '@utils/formatDate';

import {useGetScriptsQuery} from '@services/scripts';

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

export const ScriptsEntity: DashboardBlueprint = {
  entityType: 'scripts',
  route: '/dashboard/scripts',
  reduxEntity: 'scripts',
  pageTitle: 'Scripts',
  hasInfoPanel: true,
  reduxListName: 'scriptsList',
  canSelectRow: true,

  infoPanelComponent: ScriptsInfoPanel,

  useGetData: useGetScriptsQuery,
  setData: setScripts,
  selectData: selectScripts,

  setQueryFilters: setFilters,
  selectQueryFilters: selectFilters,
  selectAllFilters: selectAllScriptsFilters,

  setSelectedRecord: setSelectedScript,
  selectSelectedRecord: selectSelectedScript,

  selectedRecordIdFieldName: 'name',
  scriptTypeFieldName: 'type',

  columns: [
    {
      title: 'Script name',
      dataIndex: 'name',
    },
    {title: 'Script type', dataIndex: 'type', key: 'type'},
    {
      title: 'Script tags',
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
      component: ScriptsInfoPanel,
    },
  ],
};

export default ScriptsEntity;
