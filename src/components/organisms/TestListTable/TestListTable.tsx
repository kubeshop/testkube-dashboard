import React, {useEffect} from 'react';
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
  updateFiltredDataByStatus,
  updateSelectedTestId,
} from '@src/redux/reducers/testsListSlice';
import {ReactComponent as LeftArrowIcon} from '@assets/arrowIcon.svg';
import {getDuration, timeStampToDate} from '@src/utils/formatDate';
import {useGetTestsByStatusQuery, useGetTestsQuery} from '@src/services/tests';
import {getStatus} from '@src/redux/utils/requestFilters';
// import {useIntersectionObserver} from '@src/hooks/intersectionObserver';

interface ITestListTable {
  // data?: any;
  onChange?: () => void;
}

function TestListTable({onChange}: ITestListTable) {
  const dispatch = useDispatch();

  const handleSelectedTest = (id: string) => {
    dispatch(updateSelectedTestId(id));
  };

  // const fetchNextPageRef = React.useRef(null);
  const allTests = useAppSelector(selectTests);
  const tests = useAppSelector(selectTestsByStatus);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);

  const {data, isFetching} = useGetTestsQuery(filters, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.totals.results / filters?.pageSize);
        // totalData.push(data);
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

  const {data: testsByStatus, isFetching: fetchDataByStatus} = useGetTestsByStatusQuery(filters, {
    pollingInterval: 5000,
    skip: data,
  });

  useEffect(() => {
    const fetchData = () => {
      if (testsByStatus) {
        const totalPages = Math.trunc(testsByStatus.filtered[getStatus(filters.status)] / filters.pageSize);

        dispatch(
          updateFiltredDataByStatus({
            testsByStatus,
            hasNext: filters.page <= totalPages,
          })
        );
      }
    };
    fetchData();
  }, [testsByStatus, dispatch]);

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
      render: (testStatus: string) => <RenderTestStatusSvgIcon testStatus={testStatus} />,
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

  // const dataSource = [
  //   {
  //     scriptType: 'cypress',
  //     scriptName: 'My Script 1',
  //     name: 'Long script 1',
  //     startTime: '2021-11-15T15:21:49.229Z',
  //     endTime: '0001-01-01T00:00:00Z',
  //     duration: '2021-11-15T15:21:49.229Z',
  //     status: 'pending',
  //     id: '618e5291d88b39735423e0c6',
  //   },
  //   {
  //     scriptType: 'postman',
  //     scriptName: 'My script 2',
  //     name: 'long script 2',
  //     startTime: '2021-11-15T15:21:49.229Z',
  //     endTime: '0001-01-01T00:00:00Z',
  //     duration: '2021-11-15T15:21:49.229Z',
  //     status: 'success',
  //     id: '61927b0d45d766791f7a507e',
  //   },
  // ];

  // console.log('data', data);
  // console.log('allTests', allTests);
  return <Table columns={columns} dataSource={allTests || tests} rowClassName="table-row-dark" />;
}

export default TestListTable;
