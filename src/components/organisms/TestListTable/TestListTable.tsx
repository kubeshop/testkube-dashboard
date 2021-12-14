import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {Table} from 'antd';

import {SearchParams} from '@models/searchParams';

// import {ReactComponent as LeftArrowIcon} from '@assets/arrowIcon.svg';
import {useAppSelector} from '@redux/hooks';
import {
  changePageSize,
  paginateTo,
  selectFiltered,
  selectFilters,
  selectHasNext,
  selectTests,
  setFilters,
  updateData,
  updateSelectedTestExecutionStatus,
  updateSelectedTestId,
} from '@redux/reducers/testsListSlice';
import {getStatus} from '@redux/utils/requestFilters';

import {RenderTestStatusSvgIcon, TestTypeIcon} from '@atoms';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';
import {getDuration, timeStampToDate} from '@utils/formatDate';

import {useGetTestsQuery} from '@services/tests';

const columns = [
  {
    title: 'Type',
    dataIndex: 'scriptType',
    key: 'scriptType',
    width: '10%',
    visible: true,
    render: (testType: string) => {
      return {
        children: <TestTypeIcon testType={testType} width={30} height={30} />,
        props: {
          role: 'cell',
        },
      };
    },
  },
  {
    title: 'Script',
    dataIndex: 'scriptName',
    key: 'scriptName',
    width: '25%',
    visible: true,
    render: (scriptName: string) => {
      return {
        children: scriptName,
        props: {
          role: 'cell',
        },
      };
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    visible: true,
    render: (name: string) => {
      return {
        children: name,
        props: {
          role: 'cell',
        },
      };
    },
  },
  {
    title: 'Started At',
    dataIndex: 'startTime',
    render: (startTime: string) => {
      return {
        children: startTime ? timeStampToDate(startTime) : '-',
        props: {
          role: 'cell',
        },
      };
    },
    key: 'startTime',
    width: '15%',
    visible: true,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    render: (duration: string, row: any) => {
      return {
        children: row.endTime ? getDuration(row.startTime, row.endTime) : '-',
        props: {
          role: 'cell',
        },
      };
    },
    key: 'duration',
    width: '15%',
    visible: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '5%',
    render: (testStatus: string) => {
      return {
        children: <RenderTestStatusSvgIcon testStatus={getStatus(testStatus)} />,
        props: {
          role: 'cell',
        },
      };
    },
    visible: true,
  },
  // {
  //   title: 'id',
  //   dataIndex: 'id',
  //   key: 'id',
  //   render: (id: string) => {
  //     return {
  //       children: <LeftArrowIcon height="13px" width="8px" />,
  //       props: {
  //         role: 'cell',
  //       },
  //     };
  //   },
  //   width: '5%',
  //   visible: false,
  // },
];

const TestListTable = () => {
  const dispatch = useDispatch();

  const allTests = useAppSelector(selectTests);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);
  const filtered = useAppSelector(selectFiltered);

  const {data, isSuccess, isLoading} = useGetTestsQuery(filters, {
    pollingInterval: 5000,
  });

  const searchParams = useURLSearchParams();

  const paginationOptions = {
    onShowSizeChange: (_: any, pageSize: number) => dispatch(changePageSize(pageSize)),
    onChange: (page: number) => dispatch(paginateTo(page - 1)),
  };

  const pagination = {
    ...paginationOptions,
    total: filtered?.results,
    current: filters.page + 1,
    pageSize: filters.pageSize,
    hideOnSinglePage: true,
  };

  const handleSelectedTest = (id: string, status: string) => {
    dispatch(updateSelectedTestId(id));
    dispatch(updateSelectedTestExecutionStatus(status));
  };

  useEffect(() => {
    const fetchData = () => {
      if (isSuccess) {
        const totalPages = Math.trunc(data.totals.results / filters?.pageSize);
        dispatch(
          updateData({
            data,
            hasNext: filters.page <= totalPages,
          })
        );
      }
    };
    fetchData();
  }, [data, dispatch, filters.page, filters?.pageSize, isSuccess]);

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams.executions)}));
    }
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={allTests}
      loading={isLoading}
      rowClassName="table-row-dark"
      onRow={(record, _) => {
        return {
          style: {border: '1px solid #fff'},
          onClick: () => handleSelectedTest(record.id, record.status),
          onDoubleClick: () => null,
          props: {
            role: 'row',
          },
        };
      }}
      pagination={pagination}
    />
  );
};

export default TestListTable;
