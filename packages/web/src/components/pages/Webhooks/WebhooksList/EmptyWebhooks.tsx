import React from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {EmptyListContent, HelpCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';

interface EmptyWebhooksProps {
  onButtonClick: () => void;
}

const EmptyWebhooks: React.FC<EmptyWebhooksProps> = props => {
  const {onButtonClick} = props;
  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  return (
    <EmptyListContent
      title={isSystemAvailable ? 'Create your first webhook' : 'Cannot fetch webhooks'}
      description={
        isSystemAvailable
          ? 'Testkube can listen to cluster events and trigger specific actions.'
          : 'Connect an agent to this environment to be able to fetch or add new webhooks.'
      }
      buttonText="Create a new webhook"
      emptyListReadonlyTitle="No webhooks found"
      emptyListReadonlyDescription="We could not find any webhooks in this environment."
      onButtonClick={onButtonClick}
      actionType="create"
      isReadOnly={!isSystemAvailable}
    >
      <HelpCard isLink link={externalLinks.testTriggers}>
        What is a webhook?
      </HelpCard>
      <HelpCard isLink link={externalLinks.createTest}>
        Learn how webhooks via Testkube work.
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyWebhooks;
