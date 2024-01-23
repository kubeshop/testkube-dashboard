import {ExpandAltOutlined, FullscreenExitOutlined, SearchOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const LogOutputWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledLogOutputContainer = styled.div`
  position: relative;
  max-height: 100%;
  flex: 1;
  border-radius: 4px;
  background-color: ${Colors.slate900};
  overflow: hidden;
`;

export const StyledPreLogText = styled.pre`
  display: block;
  height: calc(100% - 20px);

  margin: 10px;
  font-size: 12px;
`;

export const StyledLogOutputActionsContainer = styled.ul`
  position: sticky;
  display: flex;
  justify-content: flex-end;
  flex: 1;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export const StyledLogOutputHeaderContainer = styled.div<{$isFullscreen?: boolean}>`
  ${({$isFullscreen}) =>
    $isFullscreen
      ? `
  position: absolute;
  right: 0;

  z-index: 1002;

  color: ${Colors.slate400};
  `
      : `
  position: relative;
  z-index: 2;
  `}

  display: flex;
  justify-content: space-between;

  border-radius: inherit;

  background: transparent;
`;

const FullscreenIconBaseStyles = `
  position: absolute;
  right: 35px;

  border-radius: 2px;

  padding: 4px;
  margin: 6px;

  font-size: 22px;
`;

export const StyledFullscreenExitOutlined = styled(FullscreenExitOutlined)`
  ${FullscreenIconBaseStyles}

  border: 1px solid transparent;
  transition: 0.3s;

  &:hover {
    border-color: ${Colors.indigo400};
  }
`;

export const StyledExpandAltOutlined = styled(ExpandAltOutlined)`
  ${FullscreenIconBaseStyles}

  border: 1px solid transparent;
  transition: 0.3s;

  &:hover {
    border-color: ${Colors.indigo400};
  }
`;

export const StyledSearchOutlined = styled(SearchOutlined)`
  border-radius: 2px;

  padding: 4px;
  margin: 6px;

  font-size: 22px;
  right: 70px;

  border: 1px solid transparent;
  transition: 0.3s;

  &:hover {
    border-color: ${Colors.indigo400};
  }
`;

export const StyledSearchInput = styled.input.attrs({type: 'text'})`
  padding: 0 10px;
  width: 150px;
  height: 25px;
  margin-left: 10px;
  line-height: 23px;
  border: 1px solid ${Colors.slate700};
  background: ${Colors.slate900};
  border-radius: 3px;

  &:focus {
    outline: none;
    border-color: ${Colors.indigo400};
  }
`;

export const StyledSearchContainer = styled.div`
  position: absolute;
  top: 22px;
  right: 70px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

export const StyledSearchResults = styled.div`
  font-size: 0.7em;
  margin-right: 10px;
`;

export const SearchArrowButton = styled.button.attrs({type: 'button'})`
  background: transparent;
  border: 0;
  outline: 0;
  width: 2em;
  height: 2em;
  line-height: 2em;
  cursor: pointer;

  &:hover {
    background: ${Colors.slate800};
  }
`;
