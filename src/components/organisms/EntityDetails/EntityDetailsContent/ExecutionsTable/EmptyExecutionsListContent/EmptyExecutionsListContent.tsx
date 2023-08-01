import React, {useContext} from 'react';

import {DashboardContext} from '@contexts';

import {EmptyListContent, HelpCard} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';

import {externalLinks} from '@utils/externalLinks';

type EmptyExecutionsListContentProps = {
  onRun: () => void;
};

const EmptyExecutionsListContent: React.FC<EmptyExecutionsListContentProps> = props => {
  const {onRun} = props;

  const {id, entity, details} = useEntityDetailsPick('id', 'entity', 'details');
  const {navigate} = useContext(DashboardContext);
  const mayRun = usePermission(Permissions.runEntity);

  if (!details) {
    return null;
  }

  if (!mayRun) {
    return (
      <EmptyListContent
        title="No executions found"
        description={
          <>
            Your {entity === 'tests' ? 'test' : 'test suite'} has no past executions. We will update this list as soon
            as the first execution was started. <br />
            Since you do only have read permissions on this environments you can not trigger a test/test suite run
          </>
        }
        buttonText="Run"
        actionType="run"
      />
    );
  }

  if (entity === 'tests') {
    return (
      <EmptyListContent
        title="Trigger your first run"
        description="Your test has no past executions. Trigger the first run!"
        buttonText="Run this test now"
        onButtonClick={onRun}
        actionType="run"
      />
    );
  }

  if (!details.steps || details.steps.length === 0) {
    return (
      <EmptyListContent
        title="Congrats, now add your tests to this suite"
        description="In order to be able to run your test suite you need to define the tests you want to add."
        buttonText="Add your tests to this suite"
        onButtonClick={() => {
          // TODO: Open "Tests" tab
          navigate(`/test-suites/${id}/settings`);
        }}
        actionType="create"
      >
        <HelpCard isLink link={externalLinks.createTestSuite}>
          Learn how to add test suites
        </HelpCard>
      </EmptyListContent>
    );
  }

  return (
    <EmptyListContent
      title="Trigger your first run"
      description="Your test suite has no past executions. Trigger the first run!"
      buttonText="Run this test suite"
      onButtonClick={onRun}
      actionType="run"
    />
  );
};

export default EmptyExecutionsListContent;
