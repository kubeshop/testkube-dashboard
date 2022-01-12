/* eslint-disable unused-imports/no-unused-imports-ts */
import {CSSProperties, memo, useMemo} from 'react';

import {CloseOutlined, LeftOutlined} from '@ant-design/icons';

import {InfoPanelConfig, InfoPanelType} from '@models/infoPanel';

import {InfoPanelHeader} from '@molecules';

import {
  StyledCollapseButtonContainer,
  StyledDashboardInfoPanelContainer,
  StyledInfoPanelSection,
} from './DashboardInfoPanel.styled';

const iconStyles: CSSProperties = {
  fontSize: 26,
  color: 'var(--color-monokle-primary)',
};

type DashboardInfoPanelProps = {
  setInfoPanelVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  scriptTypeFieldName?: string;
  shouldInfoPanelBeShown: boolean;
  isInfoPanelExpanded: boolean;
  selectedRecord: any;
  infoPanelComponent: any;
  infoPanelConfig?: InfoPanelConfig;
};

const DashboardInfoPanel: React.FC<DashboardInfoPanelProps> = memo(props => {
  const {
    selectedRecord,
    scriptTypeFieldName,
    setInfoPanelVisibility,
    isInfoPanelExpanded,
    infoPanelComponent: InfoPanelComponent,
    shouldInfoPanelBeShown,
    infoPanelConfig,
  } = props;

  const infoPanelHeaderProps = {
    title: selectedRecord && selectedRecord.name,
    ...(scriptTypeFieldName && selectedRecord ? {scriptType: selectedRecord[scriptTypeFieldName]} : {}),
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
    >
      {shouldInfoPanelBeShown ? (
        <>
          <StyledCollapseButtonContainer
            isInfoPanelExpanded={isInfoPanelExpanded}
            onClick={() => setInfoPanelVisibility((prev: boolean) => !prev)}
          >
            {!isInfoPanelExpanded ? <LeftOutlined style={iconStyles} /> : <CloseOutlined style={iconStyles} />}
          </StyledCollapseButtonContainer>
          {isInfoPanelExpanded && selectedRecord && (
            <>
              {/* {renderedView} */}
              <InfoPanelHeader {...infoPanelHeaderProps} />
              {InfoPanelComponent && <InfoPanelComponent selectedRecord={selectedRecord} />}
            </>
          )}
        </>
      ) : null}
    </StyledDashboardInfoPanelContainer>
  );
});

export default DashboardInfoPanel;
