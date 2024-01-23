import {useUnmount} from 'react-use';

import {ExternalLink} from '@atoms';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

import {Test} from '@models/test';

import {EntityView} from '@organisms';

import {Error} from '@pages';

import {useTestsSlotFirst} from '@plugins/tests-and-test-suites/hooks';

import {useGetTestsQuery} from '@services/tests';

import {initialFilters, useTestsField, useTestsSync} from '@store/tests';

import {externalLinks} from '@utils/externalLinks';
import {PollingIntervals} from '@utils/numbers';

import EmptyTests from './EmptyTests';
import TestCard from './TestCard';
import TestCreationModalContent from './TestCreationModalContent';

const PageDescription: React.FC = () => (
  <>
    Explore your tests at a glance... Learn more about{' '}
    <ExternalLink href={externalLinks.documentation}>testing with Testkube</ExternalLink>
  </>
);

const TestsList: React.FC = () => {
  const isSystemAvailable = useSystemAccess(SystemAccess.system);
  const [filters, setFilters] = useTestsField('filters');

  const EntityPromoComponent = useTestsSlotFirst('EntityListPromoComponent');

  useUnmount(() => {
    setFilters({...filters, pageSize: initialFilters.pageSize});
  });

  const {
    data: tests,
    isLoading,
    isFetching,
    error,
  } = useGetTestsQuery(filters, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isSystemAvailable,
  });
  useTestsSync({tests});

  const {open: openCreateModal} = useModal({
    title: 'Create a test',
    width: 880,
    content: <TestCreationModalContent />,
    dataTestCloseBtn: 'add-a-new-test-modal-close-button',
    dataTestModalRoot: 'add-a-new-test-modal',
  });

  const onItemClick = useDashboardNavigate((item: Test) => `/tests/${item.name}`);

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }

  if (EntityPromoComponent) {
    return <EntityPromoComponent list="tests" />;
  }

  return (
    <EntityView
      itemKey="test.name"
      CardComponent={TestCard}
      onItemClick={onItemClick}
      entity="tests"
      pageTitle="Tests"
      addEntityButtonText="Add a new test"
      pageDescription={<PageDescription />}
      emptyDataComponent={EmptyTests}
      initialFiltersState={initialFilters}
      dataTest="add-a-new-test-btn"
      queryFilters={filters}
      setQueryFilters={setFilters}
      data={tests}
      isLoading={isLoading || !isSystemAvailable}
      isFetching={isFetching}
      onAdd={openCreateModal}
    />
  );
};

export default TestsList;
