import React from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {EmptyListContent, HelpCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';

interface EmptyCustomExecutorsProps {
  onButtonClick: () => void;
}

const EmptyCustomExecutors: React.FC<EmptyCustomExecutorsProps> = props => {
  const {onButtonClick} = props;
  const isSystemAvailable = useSystemAccess(SystemAccess.system);
  return (
    <EmptyListContent
      title={isSystemAvailable ? 'Create your first custom executor' : 'Cannot fetch executors'}
      description={
        isSystemAvailable
          ? 'Define your container image, customize your commands and arguments and start testing.'
          : 'Connect an agent to this environment to be able to fetch or add new executors.'
      }
      buttonText="Create a new executor"
      emptyListReadonlyDescription="We could not find any custom container executors in this environment."
      emptyListReadonlyTitle="No custom executors found"
      onButtonClick={onButtonClick}
      actionType="create"
      isReadOnly={!isSystemAvailable}
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

export default EmptyCustomExecutors;
