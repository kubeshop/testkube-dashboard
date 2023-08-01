import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import EntityDetailsLayer from '@organisms/EntityDetails/EntityDetailsLayer';
import ExecutionDetailsLayer from '@organisms/EntityDetails/ExecutionDetailsLayer';

import TestSuiteDetailsContent from './TestSuiteDetailsContent';

interface TestSuiteDetailsProps {
  tab?: string;
}

const TestSuiteDetails: FC<TestSuiteDetailsProps> = ({tab}) => {
  const {id, execId} = useParams();
  return (
    <EntityDetailsLayer entity="test-suites" id={id!} execId={execId}>
      <ExecutionDetailsLayer entity="test-suites" id={id!} execId={execId}>
        <TestSuiteDetailsContent tab={tab} />
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};

export default TestSuiteDetails;
