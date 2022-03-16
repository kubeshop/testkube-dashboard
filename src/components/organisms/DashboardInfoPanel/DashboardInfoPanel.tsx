/* eslint-disable unused-imports/no-unused-imports-ts */
import {CSSProperties, useContext, useEffect} from 'react';

import {CloseOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons';

import {InfoPanelHeader} from '@molecules';

import Colors from '@styles/Colors';

import {DashboardContext} from '../DashboardContainer/DashboardContainer';
import {
  StyledCollapseButtonContainer,
  StyledCollapseButtonsContainer,
  StyledDashboardInfoPanelContainer,
} from './DashboardInfoPanel.styled';
import DashboardInfoPanelSecondLevel from './DashboardInfoPanelSecondLevel';
import EmptyDashboardInfoPanel from './EmptyDashboardInfoPanel';

const iconStyles: CSSProperties = {
  fontSize: 26,
  color: Colors.purple,
};

const DashboardInfoPanel: React.FC = () => {
  const {
    selectedRecord,
    testTypeFieldName,
    setInfoPanelVisibility,
    isInfoPanelExpanded,
    infoPanelComponent: InfoPanelComponent,
    shouldInfoPanelBeShown,
    setSecondLevelOpenState,
    isSecondLevelOpen,
    closeSecondLevel,
    closeDrawer,
    entityType,
  } = useContext(DashboardContext);

  const infoPanelHeaderProps = {
    title: selectedRecord && selectedRecord.name,
    ...(testTypeFieldName && selectedRecord ? {testType: selectedRecord[testTypeFieldName]} : {}),
    ...(selectedRecord?.labels ? {labels: selectedRecord?.labels} : {}),
  };

  const getCollapseButtonAction = () => {
    if (isInfoPanelExpanded) {
      if (isSecondLevelOpen) {
        closeSecondLevel();
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
        <EmptyDashboardInfoPanel />
      ) : (
        <div style={{display: 'flex', flex: 1, position: 'relative'}}>
          <div style={{display: 'flex', flexDirection: 'column', flex: 2, position: 'relative', overflow: 'auto'}}>
            {shouldInfoPanelBeShown ? (
              <>
                {isInfoPanelExpanded && selectedRecord && (
                  <>
                    <InfoPanelHeader {...infoPanelHeaderProps} />
                    {InfoPanelComponent && <InfoPanelComponent selectedRecord={selectedRecord} />}
                  </>
                )}
              </>
            ) : null}
          </div>
          {isSecondLevelOpen ? (
            <DashboardInfoPanelSecondLevel
              isInfoPanelExpanded={isInfoPanelExpanded}
              shouldInfoPanelBeShown={shouldInfoPanelBeShown}
              setSecondLevelOpenState={setSecondLevelOpenState}
              isSecondLevelOpen={isSecondLevelOpen}
            />
          ) : null}
        </div>
      )}
    </StyledDashboardInfoPanelContainer>
  );
};

export default DashboardInfoPanel;
