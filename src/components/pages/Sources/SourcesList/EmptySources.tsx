import React from 'react';

import {EmptyListContent, HelpCard} from '@molecules';

interface EmptySourcesProps {
  onButtonClick: () => void;
}

const EmptySources: React.FC<EmptySourcesProps> = props => {
  const {onButtonClick} = props;

  return (
    <EmptyListContent
      title="Create your first global source"
      description="Define your git repository to be able to reuse it later on when you create your tests."
      buttonText="Create a new source"
      emptyListReadonlyTitle="No sources found"
      emptyListReadonlyDescription="We could not find any global sources in this environment."
      onButtonClick={onButtonClick}
      actionType="create"
    >
      <HelpCard isLink link="https://kubeshop.github.io/testkube/openapi#tag/test-sources">
        What is a test source?
      </HelpCard>
      <HelpCard isLink link="https://kubeshop.github.io/testkube/category/tests">
        Learn how tests via Testkube work.
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptySources;
