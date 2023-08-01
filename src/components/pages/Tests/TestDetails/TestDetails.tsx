import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {EntityDetailsWrapper} from '@organisms/EntityDetails/EntityDetailsContainer/EntityDetailsContainer.styled';
import EntityDetailsContent from '@organisms/EntityDetails/EntityDetailsContent';
import EntityDetailsLayer from '@organisms/EntityDetails/EntityDetailsLayer';
import ExecutionDetailsLayer from '@organisms/EntityDetails/ExecutionDetailsLayer';

import TestExecutionDetailsDrawer from './TestExecutionDetailsDrawer';

const TestDetails: FC = () => {
  const {id, execId} = useParams();
  return (
    <EntityDetailsLayer entity="tests" id={id!} execId={execId}>
      <ExecutionDetailsLayer entity="tests" id={id!} execId={execId}>
        <EntityDetailsWrapper>
          <EntityDetailsContent />
          <TestExecutionDetailsDrawer />
        </EntityDetailsWrapper>
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};

export default TestDetails;
