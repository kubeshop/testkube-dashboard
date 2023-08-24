import {FC} from 'react';

import {EmptyListContent} from '@molecules/EmptyListContent';
import {HelpCard} from '@molecules/HelpCard';

import {externalLinks} from '@utils/externalLinks';

interface EmptyCustomExecutorsProps {
  onButtonClick: () => void;
}

export const EmptyCustomExecutors: FC<EmptyCustomExecutorsProps> = props => {
  const {onButtonClick} = props;

  return (
    <EmptyListContent
      title="Create your first custom executor"
      description="Define your container image, customize your commands and arguments and start testing."
      buttonText="Create a new executor"
      emptyListReadonlyDescription="We could not find any custom container executors in this environment."
      emptyListReadonlyTitle="No custom executors found"
      onButtonClick={onButtonClick}
      actionType="create"
    >
      <HelpCard isLink link={externalLinks.containerExecutor}>
        What is an executor?
      </HelpCard>
      <HelpCard isLink link={externalLinks.containerExecutor}>
        Learn how to easily create a container based executor
      </HelpCard>
      <HelpCard isLink link={externalLinks.customExecutor}>
        Want to add more complex executors?
      </HelpCard>
    </EmptyListContent>
  );
};
