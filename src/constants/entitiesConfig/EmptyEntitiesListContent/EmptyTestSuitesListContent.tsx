import {EmptyListContent, HelpCard} from '@molecules';

const EmptyTestSuitesListContent: React.FC<{action: () => void}> = props => {
  const {action} = props;

  return (
    <EmptyListContent
      title="Create your first test suite in a few easy steps."
      description="Simply define your test suites, add any tests, execute it and view the results!"
      buttonText="Add a new test suite"
      emptyListReadonlyDescription="We could not find any test suites in this environment."
      emptyListReadonlyTitle="No test suites found"
      onButtonClick={action}
      actionType="create"
    >
      <HelpCard isLink link="https://docs.testkube.io/articles/creating-test-suites">
        Learn how to add test suites
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyTestSuitesListContent;
