import {CSSProperties, useContext} from 'react';

import Colors from '@styles/Colors';

import {DashboardContext} from '../../DashboardContainer/DashboardContainer';
import {StyledDashboardInfoPanelSecondLevelContainer} from '../DashboardInfoPanel.styled';

const iconStyles: CSSProperties = {
  fontSize: 26,
  color: Colors.purple,
};

const DashboardInfoPanelSecondLevel = (props: any) => {
  const {
    dashboardGradient,
    selectedRecord,
    setSecondLevelOpenState,
    isInfoPanelExpanded,
    shouldInfoPanelBeShown,
    isSecondLevelOpen,
    selectedExecution,
    closeSecondLevel,
    closeDrawer,
    setInfoPanelVisibility,
  } = useContext(DashboardContext);

  console.log('selectedExecution: ', selectedExecution);

  return (
    <StyledDashboardInfoPanelSecondLevelContainer
      shouldInfoPanelBeShown={shouldInfoPanelBeShown}
      isInfoPanelExpanded={isInfoPanelExpanded}
      isSecondLevelOpen={isSecondLevelOpen}
    >
      dsadsa
    </StyledDashboardInfoPanelSecondLevelContainer>
  );
};

export default DashboardInfoPanelSecondLevel;
