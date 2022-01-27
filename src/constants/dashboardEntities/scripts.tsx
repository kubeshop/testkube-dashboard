import {Link} from 'react-router-dom';

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
    {
      title: '',
      dataIndex: 'name',
      render: (name: any) => {
        return (
          <Button type="primary" ghost>
            <Link to={`/dashboard/executions?scriptName=${name}`}>Show script executions</Link>
          </Button>
        );
      },
    },
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
