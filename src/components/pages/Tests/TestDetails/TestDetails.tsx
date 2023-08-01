import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import EntityDetailsLayer from '@organisms/EntityDetails/EntityDetailsLayer';
import ExecutionDetailsLayer from '@organisms/EntityDetails/ExecutionDetailsLayer';

import TestDetailsContent from './TestDetailsContent';

interface TestDetailsProps {
  tab?: string;
}

const TestDetails: FC<TestDetailsProps> = ({tab}) => {
  const {id, execId} = useParams();
  return (
    <EntityDetailsLayer entity="tests" id={id!} execId={execId}>
      <ExecutionDetailsLayer entity="tests" id={id!} execId={execId}>
        <TestDetailsContent tab={tab} />
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};

export default TestDetails;
