import React, {ReactElement, useEffect} from 'react';
import {Table, Button} from 'antd';
import {useDispatch} from 'react-redux';

import {TestTypeIcon, RenderTestStatusSvgIcon} from '@atoms';
import {useAppSelector} from '@src/redux/hooks';
import {
  changePageSize,
  nextPage,
  selectFilters,
  selectHasNext,
  selectTests,
  selectFiltered,
  updateData,
  updateSelectedTestId,
  prevPage,
  paginateTo,
} from '@src/redux/reducers/testsListSlice';
import {ReactComponent as LeftArrowIcon} from '@assets/arrowIcon.svg';
import {getDuration, timeStampToDate} from '@src/utils/formatDate';
import {useGetTestsByDateQuery, useGetTestsByStatusQuery, useGetTestsQuery} from '@src/services/tests';
import {getStatus} from '@src/redux/utils/requestFilters';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

interface ITestListTable {
  onChange?: () => void;
}

function TestListTable() {
  const dispatch = useDispatch();
  const handleSelectedTest = (id: string) => {
    dispatch(updateSelectedTestId(id));
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
      render: (testType: string) => <TestTypeIcon testType={testType} width={30} height={30} />,
      visible: true,
    },
    {
      title: 'Script',
      dataIndex: 'scriptName',
      key: 'scriptName',
      width: '25%',
      visible: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      visible: true,
    },
    {
      title: 'Started At',
      dataIndex: 'startTime',
      render: (startTime: string) => (startTime ? timeStampToDate(startTime) : '-'),
      key: 'startTime',
      width: '15%',
      visible: true,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (duration: string, row: any) => (row.endTime ? getDuration(duration, row.endTime) : '-'),
      key: 'duration',
      width: '15%',
      visible: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '5%',
      render: (testStatus: string) => <RenderTestStatusSvgIcon testStatus={getStatus(testStatus)} />,
      visible: true,
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <LeftArrowIcon height="13px" width="8x" />,
      width: '5%',
      visible: false,
    },
  ];
  function itemRender(_current: number, type: string, originalElement: ReactElement) {
    if (type === 'prev') {
      return (
        <Button className="ant-pagination-item-link" onClick={() => dispatch(prevPage())} icon={<LeftOutlined />} />
      );
    }
    if (type === 'next') {
      return (
        <Button className="ant-pagination-item-link" onClick={() => dispatch(nextPage())} icon={<RightOutlined />} />
      );
    }
    return originalElement;
  }
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
          onClick: event => handleSelectedTest(record.id),
        };
      }}
      pagination={pagination}
    />
  );
}

export default TestListTable;
