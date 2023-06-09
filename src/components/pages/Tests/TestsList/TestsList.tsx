import {FC, useContext, useEffect} from 'react';

import {ExternalLink} from '@atoms';

import {MainContext} from '@contexts';

import {EntityListContent} from '@organisms';

import {useAppSelector} from '@redux/hooks';
import {initialTestsFiltersState} from '@redux/initialState';
import {selectTests, selectTestsFilters, setTests, setTestsFilters} from '@redux/reducers/testsSlice';

import {useGetTestsQuery} from '@services/tests';

import {externalLinks} from '@utils/externalLinks';
import {PollingIntervals} from '@utils/numbers';

import EmptyTests from './EmptyTests';
import TestCard from './TestCard';

const PageDescription: FC = () => (
  <>
    Explore your tests at a glance... Learn more about{' '}
    <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
  </>
);

const TestsList: FC = () => {
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const queryFilters = useAppSelector(selectTestsFilters);

  const {data, isLoading, isFetching} = useGetTestsQuery(queryFilters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  useEffect(() => {
    dispatch(setTests(data || []));
  }, [data]);

  return (
    <EntityListContent
      CardComponent={TestCard}
      entity="tests"
      pageTitle="Tests"
      addEntityButtonText="Add a new test"
      pageDescription={PageDescription}
      emptyDataComponent={EmptyTests}
      initialFiltersState={initialTestsFiltersState}
      dataTest="add-a-new-test-btn"
      queryFilters={queryFilters}
      setQueryFilters={setTestsFilters}
      data={useAppSelector(selectTests)}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default TestsList;
