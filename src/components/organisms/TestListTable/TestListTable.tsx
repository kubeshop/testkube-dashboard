import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import {useDispatch} from 'react-redux';

import {TestTypeIcon, RenderTestStatusSvgIcon} from '@atoms';
import {useAppSelector} from '@src/redux/hooks';
import {
  // nextPage,
  selectFilters,
  selectHasNext,
  selectTests,
  selectTestsByStatus,
  updateData,
  updateSelectedTestId,
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
  const [finalData, setFinalData] = useState<any>([]);
  const handleSelectedTest = (id: string) => {
    dispatch(updateSelectedTestId(id));
  };

  // const fetchNextPageRef = React.useRef(null);
  const allTests = useAppSelector(selectTests);
  const tests = useAppSelector(selectTestsByStatus);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);

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
  const {data, isSuccess} = results;

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
  }, [data, dispatch]);

  // useEffect(() => {
  //   const fetchData = () => {
  //     if (testsByStatus) {
  //       const totalPages = Math.trunc(testsByStatus.filtered[getStatus(filters.status)] / filters.pageSize);

  //       dispatch(
  //         updateFiltredDataByStatus({
  //           testsByStatus,
  //           hasNext: filters.page <= totalPages,
  //         })
  //       );
  //     }
  //   };
  //   fetchData();
  // }, [testsByStatus, dispatch]);

  // useIntersectionObserver({
  //   target: fetchNextPageRef,
  //   onIntersect: () => dispatch(nextPage()),
  //   enabled: hasNext,
  // });

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
      render: (id: string) => <LeftArrowIcon height="13px" width="8x" onClick={() => handleSelectedTest(id)} />,
      width: '5%',
      visible: false,
    },
  ];

  return <Table columns={columns} dataSource={allTests} loading={results.isLoading} rowClassName="table-row-dark" />;
}

export default TestListTable;
