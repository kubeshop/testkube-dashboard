import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '@redux/hooks';
import {useGetTestsByStatusQuery, useGetTestsQuery} from '@src/services/tests';
// import {useIntersectionObserver} from '@src/hooks/intersectionObserver';

import {
  // nextPage,
  selectFilters,
  selectHasNext,
  selectTests,
  updateData,
  updateFiltredDataByStatus,
} from '@redux/reducers/testsListSlice';
import {TableHeader} from '@src/components/atoms';
import {Table} from 'antd';
import {getStatus} from '@src/redux/utils/requestFilters';

const AllTests = () => {
  const allTests = useAppSelector(selectTests);
  const filters = useAppSelector(selectFilters);
  const hasNext = useAppSelector(selectHasNext);

  const dispatch = useDispatch();
  // const fetchNextPageRef = React.useRef(null);

  const {data, isFetching} = useGetTestsQuery(filters, {
    pollingInterval: 5000,
    skip: !allTests.length,
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

  const {data: testsByStatus, isFetching: isFetchingStatus} = useGetTestsByStatusQuery(filters, {
    pollingInterval: 5000,
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

  return (
    <Table rowClassName="table-row-dark">
      <TableHeader />
    </Table>
  );
};

export default AllTests;
