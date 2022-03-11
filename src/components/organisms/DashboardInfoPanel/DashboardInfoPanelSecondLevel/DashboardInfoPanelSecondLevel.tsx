import {StyledDashboardInfoPanelSecondLevelContainer} from '../DashboardInfoPanel.styled';

const DashboardInfoPanelSecondLevel = (props: any) => {
  const {isInfoPanelExpanded, shouldInfoPanelBeShown, setSecondLevelOpenState, isSecondLevelOpen} = props;
  return (
    <StyledDashboardInfoPanelSecondLevelContainer
      shouldInfoPanelBeShown={shouldInfoPanelBeShown}
      isInfoPanelExpanded={isInfoPanelExpanded}
      isSecondLevelOpen={isSecondLevelOpen}
    >
      {isSecondLevelOpen ? 'Data' : null}
    </StyledDashboardInfoPanelSecondLevelContainer>
  );
};

export default DashboardInfoPanelSecondLevel;
