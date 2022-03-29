import {DashboardBlueprint} from '@models/dashboard';

import {StyledEmptyDashboardInfoPanel, StyledEmptyDashboardInfoPanelText} from './DashboardInfoPanel.styled';

type EmptyDashboardInfoPanelProps = {
  emptyDrawerEntity: DashboardBlueprint['emptyDrawerEntity'];
};

const EmptyDashboardInfoPanel: React.FC<EmptyDashboardInfoPanelProps> = props => {
  const {emptyDrawerEntity} = props;

  return (
    <StyledEmptyDashboardInfoPanel>
      <StyledEmptyDashboardInfoPanelText>
        Select a {emptyDrawerEntity} on the left to see more details
      </StyledEmptyDashboardInfoPanelText>
    </StyledEmptyDashboardInfoPanel>
  );
};

export default EmptyDashboardInfoPanel;
