import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

// import {Spinner, Typography} from '@src/components/atoms';
import styled from 'styled-components';
// import {TestListItem} from '@atoms';

import {useGetTestsByStatusQuery} from '@services/tests';

import {
  nextPage,
  selectFilters,
  selectHasNext,
  selectTestsByStatus,
  updateFiltredDataByStatus,
} from '@redux/reducers/testsListSlice';
import {useAppSelector} from '@redux/hooks';
import {getStatus} from '@redux/utils/requestFilters';
// import {nanoid} from '@reduxjs/toolkit';
import {useIntersectionObserver} from '@src/hooks/intersectionObserver';
import {Table} from 'antd';
import {RenderTestStatusSvgIcon, TestTypeIcon} from '@src/components/atoms';
import {getDuration, timeStampToDate} from '@src/utils/formatDate';

const StyledTestListContainer = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
`;

const TestsByStatus = () => {
  const tests = useAppSelector(selectTestsByStatus);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);
  const dispatch = useDispatch();
  const fetchNextPageRef = React.useRef(null);

  const {data, isFetching} = useGetTestsByStatusQuery(filters, {
    pollingInterval: 5000,
  });

  useEffect(() => {
    const fetchData = () => {
      if (data) {
        const totalPages = Math.trunc(data.filtered[getStatus(filters.status)] / filters.pageSize);

        dispatch(
          updateFiltredDataByStatus({
            data,
            hasNext: filters.page <= totalPages,
          })
        );
      }
    };
    fetchData();
  }, [data, dispatch]);

  useIntersectionObserver({
    target: fetchNextPageRef,
    onIntersect: () => dispatch(nextPage()),
    enabled: hasNext,
  });

  const tableHeaderColumns = [
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
      // eslint-disable-next-line react/jsx-no-undef
      // render: (id: string) => <LeftArrowIcon height="13px" width="8x" onClick={() => dispatch(updateSelectedTestId(id))} />,
      width: '5%',
      visible: false,
    },
  ];

  return (
    <Table
      columns={tableHeaderColumns}
      dataSource={tests}
      rowClassName="table-row-dark"
      // components={{
      //   header: {
      //     row: (props: any) => renderHeader(props, columns),
      //   },
      // }}
    />
  );
};

export default TestsByStatus;
