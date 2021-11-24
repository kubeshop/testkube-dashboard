import React, {useEffect} from 'react';
import {Table} from 'antd';
import {useDispatch} from 'react-redux';

import {TestTypeIcon, RenderTestStatusSvgIcon} from '@atoms';
import {useAppSelector} from '@src/redux/hooks';
import {
  changePageSize,
  selectFilters,
  selectHasNext,
  selectTests,
  selectFiltered,
  updateData,
  updateSelectedTestId,
  paginateTo,
  updateSelectedTestExecutionStatus,
} from '@src/redux/reducers/testsListSlice';
import {ReactComponent as LeftArrowIcon} from '@assets/arrowIcon.svg';
import {getDuration, timeStampToDate} from '@src/utils/formatDate';
import {useGetTestsByDateQuery, useGetTestsByStatusQuery, useGetTestsQuery} from '@src/services/tests';
import {getStatus} from '@src/redux/utils/requestFilters';

interface ITestListTable {
  onChange?: () => void;
}

function TestListTable() {
  const dispatch = useDispatch();
  const handleSelectedTest = (id: string, status: string) => {
    dispatch(updateSelectedTestId(id));
    dispatch(updateSelectedTestExecutionStatus(status));
  };

  const allTests = useAppSelector(selectTests);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);
  const filtered = useAppSelector(selectFiltered);

  const testsQuery = useGetTestsQuery(filters, {
    pollingInterval: 5000,
    skip: !(filters.status === undefined && !filters.date),
  });

  const testsQueryByStatus = useGetTestsByStatusQuery(filters, {
    pollingInterval: 5000,
    skip: filters.status === undefined,
  });

  const testsQueryByDate = useGetTestsByDateQuery(filters, {
    pollingInterval: 5000,
    skip: !filters.date,
  });

  const results = testsQuery.isSuccess
    ? testsQuery
    : testsQueryByStatus.isSuccess
    ? testsQueryByStatus
    : testsQueryByDate;
  const {data, isSuccess, isLoading} = results;

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

  const columns = [
    {
      title: 'Type',
      dataIndex: 'scriptType',
      key: 'scriptType',
      width: '10%',
      visible: true,
      // eslint-disable-next-line no-dupe-keys
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
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => {
        return {
          children: <LeftArrowIcon height="13px" width="8x" />,
          props: {
            role: 'cell',
          },
        };
      },
      width: '5%',
      visible: false,
    },
  ];

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
}

export default TestListTable;
