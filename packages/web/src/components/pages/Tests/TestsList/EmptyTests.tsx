import {FC} from 'react';

import {EmptyListContent, HelpCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';

interface EmptyTestsProps {
  action: () => void;
  isClusterAvailable?: boolean;
}

const EmptyTests: FC<EmptyTestsProps> = ({action, isClusterAvailable}) => {
  return (
    <EmptyListContent
      title={
        isClusterAvailable
          ? 'Create your first test in a few easy steps.'
          : 'This environment does not have any tests defined.'
      }
      description={
        isClusterAvailable
          ? 'Simply define your test, add any variables, execute it and view the results!'
          : 'To add a test, connect an agent to this environment.'
      }
      buttonText="Add a new test"
      emptyListReadonlyTitle="No tests found"
      emptyListReadonlyDescription="We could not find any tests in this environment."
      onButtonClick={action}
      actionType="create"
      isReadOnly={!isClusterAvailable}
    >
      <HelpCard isLink link={externalLinks.createTest}>
        Learn how to add tests
      </HelpCard>
      <HelpCard isLink link={externalLinks.containerExecutor}>
        How to add your very own test types and executors?
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyTests;
