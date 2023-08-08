import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {EntityDetailsLayer, ExecutionDetailsLayer} from '@organisms/EntityDetails';

import TestDetailsContent from './TestDetailsContent';

interface TestDetailsProps {
  tab?: string;
}

const TestDetails: FC<TestDetailsProps> = ({tab}) => {
  const {id, execId, settingsTab} = useParams();
  return (
    <EntityDetailsLayer entity="tests" id={id!} execId={execId}>
      <ExecutionDetailsLayer entity="tests" id={id!} execId={execId}>
        <TestDetailsContent tab={tab} settingsTab={settingsTab} />
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};

export default TestDetails;
