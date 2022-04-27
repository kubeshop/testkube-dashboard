import {DashboardBlueprint} from '@models/dashboard';

import {StyledEmptyDashboardInfoPanel, StyledEmptyDashboardInfoPanelText} from './DashboardInfoPanel.styled';

type EmptyDashboardInfoPanelProps = {
  emptyDrawerEntity: DashboardBlueprint['emptyDrawerEntity'];
};

const EmptyDashboardInfoPanel: React.FC<EmptyDashboardInfoPanelProps> = props => {
  const {emptyDrawerEntity} = props;

  const isDemoEnv = window.location.hostname.includes('demo.testkube');

  const emptyDrawerText = false ? '' : `Select a ${emptyDrawerEntity} on the left to see more details`;

  return (
    <StyledEmptyDashboardInfoPanel>
      <StyledEmptyDashboardInfoPanelText>{emptyDrawerText}</StyledEmptyDashboardInfoPanelText>
    </StyledEmptyDashboardInfoPanel>
  );
};

export default EmptyDashboardInfoPanel;
