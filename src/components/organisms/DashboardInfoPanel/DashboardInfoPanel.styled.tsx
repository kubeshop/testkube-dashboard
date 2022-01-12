import styled, {keyframes} from 'styled-components';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const StyledDashboardInfoPanelContainer = styled.div<{
  isInfoPanelExpanded?: boolean;
  shouldInfoPanelBeShown: boolean;
}>`
  position: fixed;
  right: ${props => (props.shouldInfoPanelBeShown ? (props.isInfoPanelExpanded ? '0' : '-550px') : '-630px')};
  overflow: auto;

  display: flex;
  flex-direction: column;

  width: 630px;
  height: 100%;

  background: #1d1d1d;

  // animation: ${props => (props.shouldInfoPanelBeShown ? fadeIn : fadeOut)} 0.2s linear;
  // animation-fill-mode: forwards;
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
