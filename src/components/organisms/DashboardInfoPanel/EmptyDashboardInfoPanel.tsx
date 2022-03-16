import {useContext} from 'react';

import {DashboardContext} from '../DashboardContainer/DashboardContainer';
import {StyledEmptyDashboardInfoPanel, StyledEmptyDashboardInfoPanelText} from './DashboardInfoPanel.styled';

const EmptyDashboardInfoPanel = () => {
  const {emptyDrawerEntity} = useContext(DashboardContext);

  return (
    <StyledEmptyDashboardInfoPanel>
      <StyledEmptyDashboardInfoPanelText>
        Select a {emptyDrawerEntity} on the left to see more details
      </StyledEmptyDashboardInfoPanelText>
    </StyledEmptyDashboardInfoPanel>
  );
};

export default EmptyDashboardInfoPanel;
