import {FC, useContext, useEffect} from 'react';

import {ExternalLink} from '@atoms';

import {MainContext} from '@contexts';
import {ModalConfig} from '@contexts/ModalContext';

import {EntityListContent} from '@organisms';

import {useAppSelector} from '@redux/hooks';
import {initialTestsFiltersState} from '@redux/initialState';
import {selectTests, selectTestsFilters, setTests, setTestsFilters} from '@redux/reducers/testsSlice';

import {useGetTestsQuery} from '@services/tests';

import {externalLinks} from '@utils/externalLinks';
import {PollingIntervals} from '@utils/numbers';

import EmptyTests from './EmptyTests';
import TestCard from './TestCard';
import TestCreationModalContent from './TestCreationModalContent';

const PageDescription: FC = () => (
  <>
    Explore your tests at a glance... Learn more about{' '}
    <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
  </>
);

export const createModal: ModalConfig = {
  title: 'Create a test',
  width: 880,
  content: <TestCreationModalContent />,
  dataTestCloseBtn: 'add-a-new-test-modal-close-button',
  dataTestModalRoot: 'add-a-new-test-modal',
};

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
      createModalConfig={createModal}
    />
  );
};

export default TestsList;
