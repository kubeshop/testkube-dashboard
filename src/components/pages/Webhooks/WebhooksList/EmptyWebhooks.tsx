import React from 'react';

import {EmptyListContent, HelpCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';

interface EmptyWebhooksProps {
  onButtonClick: () => void;
}

const EmptyWebhooks: React.FC<EmptyWebhooksProps> = props => {
  const {onButtonClick} = props;

  return (
    <EmptyListContent
      title="Create your first webhook"
      description="Testkube can listen to cluster events and trigger specific actions."
      buttonText="Create a new webhook"
      emptyListReadonlyTitle="No webhooks found"
      emptyListReadonlyDescription="We could not find any webhooks in this environment."
      onButtonClick={onButtonClick}
      actionType="create"
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
