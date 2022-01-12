import {NavLink} from 'react-router-dom';

import {Button} from 'antd';

import {DashboardBlueprint} from '@models/dashboard';

import {
  selectAllScriptsFilters,
  selectFilters,
  selectScripts,
  selectSelectedScript,
  setFilters,
  setScripts,
  setSelectedScript,
} from '@redux/reducers/scriptsSlice';

import {InfoPanelHeader} from '@molecules';
import {ScriptsFilters} from '@molecules/Filters';

import ScriptsInfoPanel from '@organisms/DashboardInfoPanel/InfoPanels/ScriptsInfoPanel';

import {timeStampToDate} from '@utils/formatDate';

import {useGetScriptsQuery} from '@services/scripts';

export const ScriptsEntity: DashboardBlueprint = {
  entityType: 'scripts',
  route: '/dashboard/scripts',
  reduxEntity: 'scripts',
  pageTitle: 'Scripts',
  hasInfoPanel: true,
  reduxListName: 'scriptsList',
  canSelectRow: true,

  filtersComponent: ScriptsFilters,
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
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
    },
    {title: 'Script type', dataIndex: 'type', key: 'type', width: '25%'},
    {
      title: 'Created at',
      dataIndex: 'created',
      render: (text: string) => timeStampToDate(text),
      width: '25%',
    },
    {
      title: '',
      dataIndex: 'name',
      render: (name: any) => {
        return (
          <Button type="primary" ghost>
            <NavLink to={`/dashboard/executions?scriptName=${name}`}>Show executions</NavLink>
          </Button>
        );
      },
      width: '25%',
    },
  ],
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
