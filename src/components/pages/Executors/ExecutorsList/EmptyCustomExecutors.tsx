import React from 'react';

import {EmptyListContent, HelpCard} from '@molecules';

interface EmptyCustomExecutorsProps {
  onButtonClick: () => void;
}

const EmptyCustomExecutors: React.FC<EmptyCustomExecutorsProps> = props => {
  const {onButtonClick} = props;

  return (
    <EmptyListContent
      title="Create your first custom executor"
      description="Define your container image, customize your commands and arguments and start testing."
      buttonText="Create a new executor"
      emptyListReadonlyDescription="We could not find any custom container executors in this environment."
      emptyListReadonlyTitle="No custom executors found"
      onButtonClick={onButtonClick}
    >
      <HelpCard isLink link="https://kubeshop.github.io/testkube/test-types/executor-custom">
        What is an executor?
      </HelpCard>
      <HelpCard isLink link="https://kubeshop.github.io/testkube/test-types/container-executor">
        Learn how to easily create a container based executor
      </HelpCard>
      <HelpCard isLink link="https://kubeshop.github.io/testkube/test-types/executor-custom#creating-a-custom-executor">
        Want to add more complex executors?
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptyCustomExecutors;
