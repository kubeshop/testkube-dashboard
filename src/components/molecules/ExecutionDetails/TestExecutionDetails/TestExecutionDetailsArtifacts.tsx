import {useContext} from 'react';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import {useGetTestExecutionArtifactsQuery} from '@services/tests';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import ArtifactsList from '../../ArtifactsList/ArtifactsList';

const TestExecutionDetailsArtifacts = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {data: artifactsData} = useGetTestExecutionArtifactsQuery(data.id);

  return (
    <StyledInfoPanelSection>
      {artifactsData ? <ArtifactsList artifacts={artifactsData} testExecutionId={data.id} /> : null}
    </StyledInfoPanelSection>
  );
};

export default TestExecutionDetailsArtifacts;
