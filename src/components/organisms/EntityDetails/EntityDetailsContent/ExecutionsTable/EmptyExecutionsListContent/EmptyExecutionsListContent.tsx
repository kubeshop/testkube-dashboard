import React, {useContext} from 'react';

import {openSettingsTabConfig} from '@redux/reducers/configSlice';

import {EmptyListContent, HelpCard} from '@molecules';

import {EntityDetailsContext, MainContext} from '@contexts';

type EmptyExecutionsListContentProps = {
  triggerRun: () => void;
};

const EmptyExecutionsListContent: React.FC<EmptyExecutionsListContentProps> = props => {
  const {triggerRun} = props;

  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const {dispatch} = useContext(MainContext);

  if (!entityDetails) {
    return null;
  }

  if (entity === 'tests') {
    return (
      <EmptyListContent
        title="Trigger your first run"
        description="Your test has no past exections. Trigger the first run!"
        buttonText="Run this test now"
        onButtonClick={triggerRun}
      />
    );
  }

  if (!entityDetails.steps || entityDetails.steps.length === 0) {
    return (
      <EmptyListContent
        title="Congrats, now add your tests to this suite"
        description="In order to be able to run your test suite you need to define the tests you want to add."
        buttonText="Add your tests to this suite"
        onButtonClick={() => dispatch(openSettingsTabConfig())}
      >
        <HelpCard isLink link="https://kubeshop.github.io/testkube/testsuites-creating/">
          Learn how to add test suites
        </HelpCard>
      </EmptyListContent>
    );
  }

  return (
    <EmptyListContent
      title="Trigger your first run"
      description="Your test suite has no past exections. Trigger the first run!"
      buttonText="Run this test suite"
      onButtonClick={triggerRun}
    />
  );
};

export default EmptyExecutionsListContent;
