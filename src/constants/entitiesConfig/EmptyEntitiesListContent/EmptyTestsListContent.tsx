import {EmptyListContent, HelpCard} from '@molecules';

const EmptyTestsListContent: React.FC<{action: () => void}> = props => {
  const {action} = props;

  return (
    <EmptyListContent
      title="Create your first test in a few easy steps."
      description="Simply define your test, add any variables, execute it and view the results!"
      buttonText="Add a new test"
      onButtonClick={action}
    >
      <HelpCard isLink link="https://kubeshop.github.io/testkube/tests-creating/">
        Learn how to add tests
      </HelpCard>
      <HelpCard isLink link="https://kubeshop.github.io/testkube/executor-custom/">
        How to add your very own test types and executors?
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyTestsListContent;
