import {StyledEmptyDashboardInfoPanel, StyledEmptyDashboardInfoPanelText} from './DashboardInfoPanel.styled';

const EmptyDashboardInfoPanel = () => {
  return (
    <StyledEmptyDashboardInfoPanel>
      <StyledEmptyDashboardInfoPanelText>
        Select a test suite on the left to see more details
      </StyledEmptyDashboardInfoPanelText>
    </StyledEmptyDashboardInfoPanel>
  );
};

export default EmptyDashboardInfoPanel;
