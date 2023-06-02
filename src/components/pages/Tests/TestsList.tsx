import React, {FC, useContext, useEffect, useMemo, useState} from 'react';

import {ExternalLink} from '@atoms';

import {EmptyTestsListContent} from '@constants/entitiesConfig/EmptyEntitiesListContent';

import {DashboardContext, MainContext} from '@contexts';

import {Text} from '@custom-antd';

import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import EntityGrid from '@molecules/NewEntityGrid';

import EmptyDataWithFilters from '@organisms/EntityList/EntityListContent/EmptyDataWithFilters';
import EntityListContent from '@organisms/EntityList/EntityListContent/EntityListContent';
import {Header, StyledContainer} from '@organisms/EntityList/EntityListContent/EntityListContent.styled';
import EntityListHeader from '@organisms/EntityList/EntityListContent/EntityListHeader';

import TestCard from '@pages/Tests/TestCard';

import {useAppSelector} from '@redux/hooks';
import {initialPageSize, initialTestsFiltersState} from '@redux/initialState';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {
  selectAllTestsFilters,
  selectTests,
  selectTestsFilters,
  setTests,
  setTestsFilters,
} from '@redux/reducers/testsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useApiEndpoint} from '@services/apiEndpoint';
import {useGetTestsQuery} from '@services/tests';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';
import {compareFiltersObject} from '@utils/objects';

const TestsPageDescription: FC = () => {
  return (
    <Text className="regular middle" color={Colors.slate400}>
      Explore your tests at a glance... Learn more about{' '}
      <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
    </Text>
  );
};

const TestsList: FC = () => {
  // Get app context
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const apiEndpoint = useApiEndpoint();

  // Manage local state
  const [page, setPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const onScrollBottom = () => {
    setIsLoadingMore(true);
    setPage(page + 1);
  };

  // Get state from Redux
  // const dataSource = useAppSelector(selectTests);
  const queryFilters = useAppSelector(selectTestsFilters);
  const allFilters = useAppSelector(selectAllTestsFilters);
  const isFiltersEmpty = compareFiltersObject(initialTestsFiltersState as any, queryFilters as any); // FIXME

  const resetFilters = () => {
    dispatch(setTestsFilters(initialTestsFiltersState));
  };

  // Load latest data from server
  const {
    data: _data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetTestsQuery(
    {...queryFilters, pageSize: page * initialPageSize},
    {
      pollingInterval: PollingIntervals.everySecond,
      skip: !isClusterAvailable,
    }
  );

  const isLastPage = !isLoading && _data && page * initialPageSize > _data.length;

  // Add icon to tests based on the executor  FIXME: Should be dynamically detected
  const executors = useAppSelector(selectExecutors);
  const tests = useMemo(
    () =>
      _data?.map(test => ({
        ...test,
        test: {...test.test, testIcon: getTestExecutorIcon(executors, test.test.type)},
      })),
    [_data]
  );

  // Register data locally and in Redux
  useEffect(() => {
    dispatch(setTests(tests || []));
    setIsInitialLoading(false);
    setIsLoadingMore(false);
  }, [tests]);

  // Reload data when the API changes
  useEffect(() => {
    setIsInitialLoading(true);
    setPage(1);
    safeRefetch(refetch);
  }, [apiEndpoint]);

  // Initialize telemetry
  useTrackTimeAnalytics('tests-list');

  return (
    <StyledContainer>
      <Header>
        <EntityListHeader
          title="Tests"
          description={<TestsPageDescription />}
          loading={isLoading && !isInitialLoading}
        />
        <div></div>
        {/* TODO: Add filters */}
        {/* TODO: Add create button */}
      </Header>
      <EntityGrid
        data={tests}
        Component={TestCard}
        componentProps={{
          // TODO: Make it working for cloud
          buildUrl: test => `/tests/executions/${test.name}`,
        }}
        empty={
          isFiltersEmpty ? (
            <EmptyTestsListContent action={() => {}} />
          ) : (
            <EmptyDataWithFilters resetFilters={resetFilters} />
          )
        }
        loadingInitially={isInitialLoading}
        loadingMore={isLoadingMore}
        hasMore={!isLastPage}
        onScrollEnd={onScrollBottom}
      />
    </StyledContainer>
  );
};

const old = (
  <EntityListContent
    entity="tests"
    route="/dashboard/tests"
    reduxSliceName="tests"
    pageTitle="Tests"
    addEntityButtonText="Add a new test"
    pageDescription={TestsPageDescription}
    emptyDataComponent={EmptyTestsListContent}
    useGetData={useGetTestsQuery}
    setData={setTests}
    initialFiltersState={initialTestsFiltersState}
    filtersComponentsIds={['textSearch', 'selector', 'status']}
    dataTestID="add-a-new-test-btn"
  />
);

export default TestsList;
