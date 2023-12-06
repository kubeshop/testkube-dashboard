import React from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {EmptyListContent, HelpCard} from '@molecules';

import {externalLinks} from '@utils/externalLinks';

interface EmptySourcesProps {
  onButtonClick: () => void;
}

const EmptySources: React.FC<EmptySourcesProps> = props => {
  const {onButtonClick} = props;
  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  return (
    <EmptyListContent
      title={isSystemAvailable ? 'Create your first global source' : 'Cannot fetch sources'}
      description={
        isSystemAvailable
          ? 'Define your git repository to be able to reuse it later on when you create your tests.'
          : 'Connect an agent to this environment to be able to fetch or add new sources.'
      }
      buttonText="Create a new source"
      emptyListReadonlyTitle="No sources found"
      emptyListReadonlyDescription="We could not find any global sources in this environment."
      onButtonClick={onButtonClick}
      actionType="create"
      isReadOnly={!isSystemAvailable}
    >
      <HelpCard isLink link={externalLinks.testSources}>
        What is a test source?
      </HelpCard>
      <HelpCard isLink link={externalLinks.createTest}>
        Learn how tests via Testkube work.
      </HelpCard>
    </EmptyListContent>
  );
};

export default EmptySources;
