import {FC} from 'react';

import {EmptyListContent} from '@molecules/EmptyListContent';
import {HelpCard} from '@molecules/HelpCard';

import {externalLinks} from '@utils/externalLinks';

export const EmptyTestSuites: FC<{action: () => void}> = props => {
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
      <HelpCard isLink link={externalLinks.createTestSuite}>
        Learn how to add test suites
      </HelpCard>
    </EmptyListContent>
  );
};
