import {useContext} from 'react';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import {useGetTestExecutionArtifactsQuery} from '@services/tests';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import Artifacts from '../../ExecutionResultsOutputs/Artifacts/Artifacts';

const TestExecutionDetailsArtifacts = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {data: artifactsData} = useGetTestExecutionArtifactsQuery(data.id);

  return (
    <StyledInfoPanelSection>
      {artifactsData ? <Artifacts artifacts={artifactsData} testId={data.id} /> : null}
    </StyledInfoPanelSection>
  );
};

export default TestExecutionDetailsArtifacts;
