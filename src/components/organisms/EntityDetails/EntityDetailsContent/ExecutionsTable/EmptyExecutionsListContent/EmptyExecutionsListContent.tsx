import React, {useContext} from 'react';

import {setSettingsTabConfig} from '@redux/reducers/configSlice';

import {EmptyListContent, HelpCard} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {EntityDetailsContext, MainContext} from '@contexts';

type EmptyExecutionsListContentProps = {
  triggerRun: () => void;
};

const EmptyExecutionsListContent: React.FC<EmptyExecutionsListContentProps> = props => {
  const {triggerRun} = props;

  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const {dispatch} = useContext(MainContext);
  const mayRun = usePermission(Permissions.runEntity);

  if (!entityDetails) {
    return null;
  }

  if (!mayRun) {
    return (
      // TODO: rethink empty list usage depending on permissions also
      // @ts-ignore
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
      />
    );
  }

  if (entity === 'tests') {
    return (
      <EmptyListContent
        title="Trigger your first run"
        description="Your test has no past executions. Trigger the first run!"
        buttonText="Run this test now"
        onButtonClick={triggerRun}
        actionType="run"
      />
    );
  }

  if (!entityDetails.steps || entityDetails.steps.length === 0) {
    return (
      <EmptyListContent
        title="Congrats, now add your tests to this suite"
        description="In order to be able to run your test suite you need to define the tests you want to add."
        buttonText="Add your tests to this suite"
        onButtonClick={() => dispatch(setSettingsTabConfig({entity: 'test-suites', tab: 'Tests'}))}
        actionType="create"
      >
        <HelpCard isLink link="https://kubeshop.github.io/testkube/using-testkube/test-suites/testsuites-creating/">
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
      onButtonClick={triggerRun}
      actionType="run"
    />
  );
};

export default EmptyExecutionsListContent;
