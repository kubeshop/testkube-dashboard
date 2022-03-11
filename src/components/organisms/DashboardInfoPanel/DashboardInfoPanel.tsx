/* eslint-disable unused-imports/no-unused-imports-ts */
import {CSSProperties, memo, useContext, useMemo, useState} from 'react';

import {CloseOutlined, LeftOutlined} from '@ant-design/icons';

import {InfoPanelConfig, InfoPanelType} from '@models/infoPanel';

import {InfoPanelHeader} from '@molecules';

import Colors from '@styles/Colors';

import {DashboardBlueprint} from '@src/models/dashboard';

import {DashboardContext} from '../DashboardContainer/DashboardContainer';
import {
  StyledCollapseButtonContainer,
  StyledDashboardInfoPanelContainer,
  StyledInfoPanelSection,
} from './DashboardInfoPanel.styled';
import DashboardInfoPanelSecondLevel from './DashboardInfoPanelSecondLevel';
import EmptyDashboardInfoPanel from './EmptyDashboardInfoPanel';

const iconStyles: CSSProperties = {
  fontSize: 26,
  color: Colors.blue6,
};

const DashboardInfoPanel: React.FC = () => {
  const {
    selectedRecord,
    testTypeFieldName,
    setInfoPanelVisibility,
    isInfoPanelExpanded,
    infoPanelComponent: InfoPanelComponent,
    shouldInfoPanelBeShown,
    infoPanelConfig,
    setSecondLevelOpenState,
    isSecondLevelOpen,
  } = useContext(DashboardContext);

  const infoPanelHeaderProps = {
    title: selectedRecord && selectedRecord.name,
    ...(testTypeFieldName && selectedRecord ? {testType: selectedRecord[testTypeFieldName]} : {}),
    labels: selectedRecord?.labels || {},
  };

  // const sectionProps: {[key in InfoPanelType]: any} = {
  //   header: {
  //     title: selectedRecord && selectedRecord.name,
  //     ...(scriptTypeFieldName && selectedRecord ? {scriptType: selectedRecord[scriptTypeFieldName]} : {}),
  //   },
  //   summary: {
  //     selectedRecord,
  //   },
  // };

  // const renderedView = useMemo(() => {
  //   return infoPanelConfig.map(infoPanel => {
  //     const {type, name, component: Component} = infoPanel;

  //     return (
  //       <StyledInfoPanelSection>
  //         <Component {...sectionProps[type]} />
  //       </StyledInfoPanelSection>
  //     );
  //   });
  // }, [selectedRecord]);

  return (
    <StyledDashboardInfoPanelContainer
      isInfoPanelExpanded={isInfoPanelExpanded}
      shouldInfoPanelBeShown={shouldInfoPanelBeShown}
      isSecondLevelOpen={isSecondLevelOpen}
      isRecordSelected={Boolean(selectedRecord)}
    >
      <StyledCollapseButtonContainer
        isInfoPanelExpanded={isInfoPanelExpanded}
        onClick={() => {
          if (setInfoPanelVisibility && setSecondLevelOpenState) {
            setInfoPanelVisibility(prev => !prev);
            setSecondLevelOpenState(false);
          }
        }}
      >
        {!isInfoPanelExpanded ? <LeftOutlined style={iconStyles} /> : <CloseOutlined style={iconStyles} />}
      </StyledCollapseButtonContainer>
      {!selectedRecord && isInfoPanelExpanded ? (
        <EmptyDashboardInfoPanel />
      ) : (
        <div style={{display: 'flex', flex: 1, position: 'relative'}}>
          <div style={{display: 'flex', flexDirection: 'column', flex: 2, position: 'relative', overflow: 'auto'}}>
            {shouldInfoPanelBeShown ? (
              <>
                {isInfoPanelExpanded && selectedRecord && (
                  <>
                    {/* {renderedView} */}
                    <InfoPanelHeader {...infoPanelHeaderProps} />
                    {InfoPanelComponent && <InfoPanelComponent selectedRecord={selectedRecord} />}
                  </>
                )}
                <p onClick={() => setSecondLevelOpenState && setSecondLevelOpenState(prev => !prev)}>Toggle!!!</p>
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
