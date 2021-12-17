import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';

import {Button, Table} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectScripts, setScripts} from '@redux/reducers/scriptsSlice';

import {Title} from '@atoms';

import {timeStampToDate} from '@utils/formatDate';

import {useGetScriptsQuery} from '@services/scripts';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {title: 'Script type', dataIndex: 'type', key: 'type'},
  {title: 'Created at', key: 'createdAt', dataIndex: 'created', render: (text: string) => timeStampToDate(text)},
  {
    title: '',
    dataIndex: 'name',
    key: 'showTestExecutions',
    render: (name: any) => {
      return (
        <Button type="primary" ghost>
          <NavLink to={`/dashboard/executions?scriptName=${name}`}>Show executions</NavLink>
        </Button>
      );
    },
  },
];

const Scripts = (props: any) => {
  console.log('props: ', props);
  const dispatch = useDispatch();

  const scripts = useAppSelector(selectScripts);

  const history = useHistory();

  const {data, isLoading} = useGetScriptsQuery(null, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    dispatch(setScripts({scriptsList: data}));
  }, [data]);

  return (
    <div>
      <Title>Scripts</Title>
      <Table
        dataSource={scripts}
        columns={columns}
        rowClassName="table-row-dark"
        loading={isLoading}
        pagination={{hideOnSinglePage: true}}
        onRow={script => {
          return {
            onClick: () => {
              history.push(`/dashboard/executions?scriptName=${script.name}`);
            },
          };
        }}
      />
    </div>
  );
};

export default Scripts;
