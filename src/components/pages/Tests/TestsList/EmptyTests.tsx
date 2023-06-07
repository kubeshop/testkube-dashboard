import {FC} from 'react';

import {EmptyListContent, HelpCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';

interface EmptyTestsProps {
  onButtonClick: () => void;
}

const EmptyTests: FC<EmptyTestsProps> = ({onButtonClick}) => {
  return (
    <EmptyListContent
      title="Create your first test in a few easy steps."
      description="Simply define your test, add any variables, execute it and view the results!"
      buttonText="Add a new test"
      emptyListReadonlyTitle="No tests found"
      emptyListReadonlyDescription="We could not find any tests in this environment."
      onButtonClick={onButtonClick}
      actionType="create"
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
