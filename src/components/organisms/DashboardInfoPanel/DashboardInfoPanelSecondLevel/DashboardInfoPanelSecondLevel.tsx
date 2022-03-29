import {useContext} from 'react';

import {DashboardContext} from '../../DashboardContainer/DashboardContainer';
import {StyledDashboardInfoPanelSecondLevelContainer} from '../DashboardInfoPanel.styled';
import DashboardInfoPanelSecondLevelContent from './DashboardInfoPanelSecondLevelContent';

const DashboardInfoPanelSecondLevel = () => {
  const {isInfoPanelExpanded, shouldInfoPanelBeShown, isSecondLevelOpen} = useContext(DashboardContext);

  return (
    <StyledDashboardInfoPanelSecondLevelContainer
      shouldInfoPanelBeShown={shouldInfoPanelBeShown}
      isInfoPanelExpanded={isInfoPanelExpanded}
      isSecondLevelOpen={isSecondLevelOpen}
    >
      <DashboardInfoPanelSecondLevelContent />
    </StyledDashboardInfoPanelSecondLevelContainer>
  );
};

export default DashboardInfoPanelSecondLevel;
