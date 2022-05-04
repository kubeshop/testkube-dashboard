import {CSSProperties, useContext, useEffect} from 'react';

import {CloseOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons';

import Colors from '@styles/Colors';

import {DashboardContext} from '../DashboardContainer/DashboardContainer';
import {
  StyledCollapseButtonContainer,
  StyledCollapseButtonsContainer,
  StyledDashboardInfoPanelContainer,
  StyledDashboardInfoPanelContentContainer,
} from './DashboardInfoPanel.styled';
import DashboardInfoPanelContent from './DashboardInfoPanelContent';
import DashboardInfoPanelSecondLevel from './DashboardInfoPanelSecondLevel';
import EmptyDashboardInfoPanel from './EmptyDashboardInfoPanel';

const iconStyles: CSSProperties = {
  fontSize: 26,
  color: Colors.purple,
};

const DashboardInfoPanel: React.FC = () => {
  const {
    selectedRecord,
    setInfoPanelVisibility,
    isInfoPanelExpanded,
    shouldInfoPanelBeShown,
    isSecondLevelOpen,
    closeSecondLevel,
    closeDrawer,
    entityType,
    emptyDrawerEntity,
    setSelectedExecution,
  } = useContext(DashboardContext);

  const getCollapseButtonAction = () => {
    if (isInfoPanelExpanded) {
      if (isSecondLevelOpen) {
        setSelectedExecution(null);
        closeSecondLevel();
        setSelectedExecution(null);
      } else {
        closeDrawer();
      }
    } else {
      setInfoPanelVisibility(true);
    }
  };

  const getCollapseButtonIcon = () => {
    if (isInfoPanelExpanded) {
      if (isSecondLevelOpen) {
        return <RightOutlined style={iconStyles} />;
      }

      return <CloseOutlined style={iconStyles} />;
    }

    return <LeftOutlined style={iconStyles} />;
  };

  useEffect(() => {
    closeSecondLevel();
  }, [entityType]);

  return (
    <StyledDashboardInfoPanelContainer
      isInfoPanelExpanded={isInfoPanelExpanded}
      shouldInfoPanelBeShown={shouldInfoPanelBeShown}
      isSecondLevelOpen={isSecondLevelOpen}
      isRecordSelected={Boolean(selectedRecord)}
    >
      <StyledCollapseButtonsContainer>
        <StyledCollapseButtonContainer
          isInfoPanelExpanded={isInfoPanelExpanded}
          isSecondLevelOpen={isSecondLevelOpen}
          onClick={getCollapseButtonAction}
        >
          {getCollapseButtonIcon()}
        </StyledCollapseButtonContainer>
        {isSecondLevelOpen ? (
          <StyledCollapseButtonContainer
            isInfoPanelExpanded={isInfoPanelExpanded}
            isSecondLevelOpen={isSecondLevelOpen}
            onClick={() => {
              closeDrawer();
            }}
          >
            <CloseOutlined style={{fontSize: 26, color: '#acacac'}} />
          </StyledCollapseButtonContainer>
        ) : null}
      </StyledCollapseButtonsContainer>
      {!selectedRecord && isInfoPanelExpanded ? (
        <EmptyDashboardInfoPanel emptyDrawerEntity={emptyDrawerEntity} />
      ) : (
        <StyledDashboardInfoPanelContentContainer>
          {selectedRecord && isInfoPanelExpanded ? <DashboardInfoPanelContent /> : null}
          {isSecondLevelOpen ? <DashboardInfoPanelSecondLevel /> : null}
        </StyledDashboardInfoPanelContentContainer>
      )}
    </StyledDashboardInfoPanelContainer>
  );
};

export default DashboardInfoPanel;
