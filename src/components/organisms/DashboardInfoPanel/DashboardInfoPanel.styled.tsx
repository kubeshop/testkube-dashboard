import styled from 'styled-components';

import {getInfoPanelFlexProperty} from './infoPanelStyleHelpers';

export const StyledDashboardInfoPanelContainer = styled.div<{
  isInfoPanelExpanded?: boolean;
  shouldInfoPanelBeShown: boolean;
  isSecondLevelOpen?: boolean;
  isRecordSelected?: boolean;
}>`
  position: relative;
  overflow: auto;

  display: flex;
  flex-direction: column;
  flex: ${props => getInfoPanelFlexProperty(props)};

  // width: ${props => (props.isSecondLevelOpen ? '1075px' : '630px')};
  height: 100%;

  background: #1d1d1d;

  // transition: 0.5s flex;
`;

export const StyledCollapseButtonContainer = styled.div<{isInfoPanelExpanded: boolean}>`
  display: flex;
  justify-content: ${props => (props.isInfoPanelExpanded ? 'flex-end' : 'center')};

  padding: 15px;
  width: ${props => (props.isInfoPanelExpanded ? '100%' : '80px')};

  cursor: pointer;
`;

export const StyledInfoPanelSection = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 40px;

  border-bottom: 1px solid #393939;
`;

export const StyledInfoPanelSectionTitle = styled.span`
  padding-bottom: 10px;

  color: #dbdbdb;

  font-size: 24px;
`;

export const StyledDashboardInfoPanelSecondLevelContainer = styled.div<{
  isInfoPanelExpanded?: boolean;
  shouldInfoPanelBeShown: boolean;
  isSecondLevelOpen?: boolean;
}>`
  flex: ${props => (props.isSecondLevelOpen ? '3' : '0')};
  // width: ${props => (props.isSecondLevelOpen ? '300px' : '0px')};

  display: flex;
  justify-content: center;
  align-items: center;

  background: #1c1c1c;

  // transition: 0.5s all;
`;

export const StyledEmptyDashboardInfoPanel = styled.div`
  display: flex;
  justify-content: center;

  height: 100%;
  padding: 0 50px;
  margin-top: 250px;
`;

export const StyledEmptyDashboardInfoPanelText = styled.span`
  color: #adadad;

  font-size: 20px;
  text-align: center;
`;
