import {useUnmount} from 'react-use';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

import {TestSuite} from '@models/testSuite';

import {EntityView} from '@organisms';

import {Error} from '@pages';

import {useTestsSlotFirst} from '@plugins/tests-and-test-suites/hooks';

import {useGetTestSuitesQuery} from '@services/testSuites';

import {initialFilters, useTestSuitesField, useTestSuitesSync} from '@store/testSuites';

import {PollingIntervals} from '@utils/numbers';

import EmptyTestSuites from './EmptyTestSuites';
import TestSuiteCard from './TestSuiteCard';
import TestSuiteCreationModalContent from './TestSuiteCreationModalContent';

const PageDescription: React.FC = () => <>Explore your test suites at a glance...</>;

interface TestSuitesListProps {
  isListLoading?: boolean;
}

const TestSuitesList: React.FC<TestSuitesListProps> = props => {
  const {isListLoading} = props;

  const isSystemAvailable = useSystemAccess(SystemAccess.system);
  const [filters, setFilters] = useTestSuitesField('filters');
  const pageTitleAddon = useTestsSlotFirst('testSuitesListTitleAddon');

  const EntityPromoComponent = useTestsSlotFirst('EntityListPromoComponent');

  useUnmount(() => {
    setFilters({...filters, pageSize: initialFilters.pageSize});
  });

  const {
    data: testSuites,
    error,
    isLoading,
    isFetching,
  } = useGetTestSuitesQuery(filters || null, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isSystemAvailable,
  });
  useTestSuitesSync({testSuites});

  const {open: openCreateModal} = useModal({
    title: 'Create a test suite',
    width: 528,
    content: <TestSuiteCreationModalContent />,
    dataTestCloseBtn: 'add-a-new-test-suite-modal-close-button',
    dataTestModalRoot: 'add-a-new-test-suite-modal',
  });

  const onItemClick = useDashboardNavigate((item: TestSuite) => `/test-suites/${item.name}`);

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }

  if (EntityPromoComponent) {
    return <EntityPromoComponent list="test-suites" />;
  }

  return (
    <EntityView
      itemKey="testSuite.name"
      CardComponent={TestSuiteCard}
      onItemClick={onItemClick}
      entity="test-suites"
      pageTitle="Test Suites"
      pageTitleAddon={pageTitleAddon}
      addEntityButtonText="Add a new test suite"
      pageDescription={<PageDescription />}
      emptyDataComponent={EmptyTestSuites}
      initialFiltersState={initialFilters}
      dataTest="add-a-new-test-suite-btn"
      queryFilters={filters}
      setQueryFilters={setFilters}
      data={testSuites}
      isLoading={isLoading || !isSystemAvailable}
      isFetching={isFetching}
      onAdd={openCreateModal}
      isListLoading={isListLoading ?? false}
    />
  );
};

export default TestSuitesList;
