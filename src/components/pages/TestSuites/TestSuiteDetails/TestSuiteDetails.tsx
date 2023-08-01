import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {EntityDetailsWrapper} from '@organisms/EntityDetails/EntityDetailsContainer/EntityDetailsContainer.styled';
import EntityDetailsContent from '@organisms/EntityDetails/EntityDetailsContent';
import EntityDetailsLayer from '@organisms/EntityDetails/EntityDetailsLayer';
import ExecutionDetailsLayer from '@organisms/EntityDetails/ExecutionDetailsLayer';

import TestSuiteExecutionDetailsDrawer from './TestSuiteExecutionDetailsDrawer';

const TestSuiteDetails: FC = () => {
  const {id, execId} = useParams();
  return (
    <EntityDetailsLayer entity="test-suites" id={id!} execId={execId}>
      <ExecutionDetailsLayer entity="test-suites" id={id!} execId={execId}>
        <EntityDetailsWrapper>
          <EntityDetailsContent />
          <TestSuiteExecutionDetailsDrawer />
        </EntityDetailsWrapper>
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};

export default TestSuiteDetails;
