import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import EntityDetailsLayer from '@organisms/EntityDetails/EntityDetailsLayer';
import ExecutionDetailsLayer from '@organisms/EntityDetails/ExecutionDetailsLayer';

import TestDetailsContent from './TestDetailsContent';

const TestDetails: FC = () => {
  const {id, execId} = useParams();
  return (
    <EntityDetailsLayer entity="tests" id={id!} execId={execId}>
      <ExecutionDetailsLayer entity="tests" id={id!} execId={execId}>
        <TestDetailsContent />
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};

export default TestDetails;
