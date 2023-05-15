import {EmptyListContent, HelpCard} from '@molecules';

const EmptyTestsListContent: React.FC<{action: () => void}> = props => {
  const {action} = props;

  return (
    <EmptyListContent
      title="Create your first test in a few easy steps."
      description="Simply define your test, add any variables, execute it and view the results!"
      buttonText="Add a new test"
      emptyListReadonlyTitle="No tests found"
      emptyListReadonlyDescription="We could not find any tests in this environment."
      onButtonClick={action}
      actionType="create"
    >
      <HelpCard isLink link="https://docs.testkube.io/articles/creating-tests">
        Learn how to add tests
      </HelpCard>
      <HelpCard isLink link="https://docs.testkube.io/test-types/container-executor">
        How to add your very own test types and executors?
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyTestsListContent;
