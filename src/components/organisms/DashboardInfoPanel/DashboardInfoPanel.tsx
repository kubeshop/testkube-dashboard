import {CSSProperties, memo} from 'react';

import {CloseOutlined, LeftOutlined} from '@ant-design/icons';

import {InfoPanelHeader} from '@molecules';

import {StyledCollapseButtonContainer, StyledDashboardInfoPanelContainer} from './DashboardInfoPanel.styled';

const iconStyles: CSSProperties = {
  fontSize: 26,
  color: 'var(--color-monokle-primary)',
};

type DashboardInfoPanelProps = {
  setInfoPanelVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  scriptTypeFieldName?: string;
  isInfoPanelExpanded: boolean;
  selectedRecord: any;
  infoPanelComponent: any;
};

const DashboardInfoPanel: React.FC<DashboardInfoPanelProps> = memo(props => {
  const {
    selectedRecord,
    scriptTypeFieldName,
    setInfoPanelVisibility,
    isInfoPanelExpanded,
    infoPanelComponent: InfoPanelComponent,
  } = props;

  const infoPanelHeaderProps = {
    title: selectedRecord.name,
    ...(scriptTypeFieldName ? {scriptType: selectedRecord[scriptTypeFieldName]} : {}),
  };

  return (
    <StyledDashboardInfoPanelContainer isInfoPanelExpanded={isInfoPanelExpanded}>
      <StyledCollapseButtonContainer
        isInfoPanelExpanded={isInfoPanelExpanded}
        onClick={() => setInfoPanelVisibility((prev: boolean) => !prev)}
      >
        {!isInfoPanelExpanded ? <LeftOutlined style={iconStyles} /> : <CloseOutlined style={iconStyles} />}
      </StyledCollapseButtonContainer>
      {isInfoPanelExpanded && selectedRecord && (
        <>
          <InfoPanelHeader {...infoPanelHeaderProps} />
          {InfoPanelComponent && <InfoPanelComponent selectedRecord={selectedRecord} />}
        </>
      )}
    </StyledDashboardInfoPanelContainer>
  );
});

export default DashboardInfoPanel;
