import {EmptyListContent, HelpCard} from '@molecules';

const EmptyTestSuitesListContent: React.FC<{action: () => void}> = props => {
  const {action} = props;

  return (
    <EmptyListContent
      title="Create your first test suite in a few easy steps."
      description="Simply define your test suites, add any tests, execute it and view the results!"
      buttonText="Add a new test suite"
      onButtonClick={action}
    >
      <HelpCard isLink link="https://kubeshop.github.io/testkube/using-testkube/test-suites/testsuites-creating/">
        Learn how to add test suites
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyTestSuitesListContent;
