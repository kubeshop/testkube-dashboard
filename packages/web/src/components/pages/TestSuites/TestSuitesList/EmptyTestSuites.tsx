import {FC} from 'react';

import {EmptyListContent, HelpCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';

interface EmptyTestSuitesProps {
  action: () => void;
  isClusterAvailable?: boolean;
}

const EmptyTestSuites: FC<EmptyTestSuitesProps> = ({action, isClusterAvailable}) => {
  return (
    <EmptyListContent
      title={
        isClusterAvailable
          ? 'Create your first test suite in a few easy steps.'
          : 'This environment does not have any test suites defined.'
      }
      description={
        isClusterAvailable
          ? 'Simply define your test suites, add any tests, execute it and view the results!'
          : 'To add a test suite, connect an agent to this environment.'
      }
      buttonText="Add a new test suite"
      emptyListReadonlyDescription="We could not find any test suites in this environment."
      emptyListReadonlyTitle="No test suites found"
      onButtonClick={action}
      actionType="create"
      isReadOnly={!isClusterAvailable}
    >
      <HelpCard isLink link={externalLinks.createTestSuite}>
        Learn how to add test suites
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyTestSuites;
