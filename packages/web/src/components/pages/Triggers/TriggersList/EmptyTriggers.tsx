import React from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {EmptyListContent, HelpCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';

interface EmptyTriggersProps {
  onButtonClick: () => void;
}

const EmptyTriggers: React.FC<EmptyTriggersProps> = props => {
  const {onButtonClick} = props;
  const isSystemAvailable = useSystemAccess(SystemAccess.system);
  return (
    <EmptyListContent
      title={isSystemAvailable ? 'Create your first trigger' : 'Cannot fetch triggers'}
      description={
        isSystemAvailable
          ? 'Testkube can listen to cluster events and trigger specific actions.'
          : 'Connect an agent to this environment to be able to fetch or add new triggers.'
      }
      buttonText="Create a new trigger"
      emptyListReadonlyTitle="No triggers found"
      emptyListReadonlyDescription="We could not find any triggers in this environment."
      onButtonClick={onButtonClick}
      actionType="create"
      isReadOnly={!isSystemAvailable}
    >
      <HelpCard isLink link={externalLinks.testTriggers}>
        What is a test trigger?
      </HelpCard>
      <HelpCard isLink link={externalLinks.createTest}>
        Learn how tests via Testkube work.
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyTriggers;
