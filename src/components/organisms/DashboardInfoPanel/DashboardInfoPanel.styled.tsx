import styled from 'styled-components';

export const StyledDashboardInfoPanelContainer = styled.div<{isInfoPanelExpanded?: boolean}>`
  position: fixed;
  right: ${props => (props.isInfoPanelExpanded ? '0' : '-550px')};
  overflow: auto;

  display: flex;
  flex-direction: column;

  width: 630px;
  height: 100%;

  background: #1d1d1d;

  transition: 0.5s all;
`;

export const StyledCollapseButtonContainer = styled.div<{isInfoPanelExpanded: boolean}>`
  position: absolute;
  top: 0;

  display: flex;
  justify-content: ${props => (props.isInfoPanelExpanded ? 'flex-end' : 'center')};

  padding: 20px 20px 0 20px;
  width: ${props => (props.isInfoPanelExpanded ? '630px' : '80px')};

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

  font-size: 20px;
`;
