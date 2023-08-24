import {FC} from 'react';

import {EmptyListContent} from '@molecules/EmptyListContent';
import {HelpCard} from '@molecules/HelpCard';

import {externalLinks} from '@utils/externalLinks';

interface EmptyTriggersProps {
  onButtonClick: () => void;
}

export const EmptyTriggers: FC<EmptyTriggersProps> = props => {
  const {onButtonClick} = props;

  return (
    <EmptyListContent
      title="Create your first trigger"
      description="Testkube can listen to cluster events and trigger specific actions."
      buttonText="Create a new trigger"
      emptyListReadonlyTitle="No triggers found"
      emptyListReadonlyDescription="We could not find any triggers in this environment."
      onButtonClick={onButtonClick}
      actionType="create"
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
