import {Checkbox, Dropdown, Menu} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledFilterMenu = styled(Menu)`
  border: 1px solid ${Colors.greyBorder};

  background-color: ${Colors.mainBackground};
`;

export const StyledFilterCheckbox = styled(Checkbox)`
  width: 100%;
  .ant-checkbox-inner {
    background-color: ${Colors.grey1000};
    border-color: ${Colors.greyBorder};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${Colors.purple};
    border: 0;
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${Colors.purple};
  }
  color: ${Colors.grey450};
`;

export const StyledFilterMenuItem = styled(Menu.Item)`
  &:hover,
  &:focus {
    background-color: ${Colors.slate801};
    .ant-checkbox-inner {
      border-color: ${Colors.purple};
    }
  }
`;

export const StyledFilterDropdown = styled(Dropdown)`
  padding: 0 4px;

  ${props => (props.visible ? `background-color: ${Colors.slate800};` : '')}
`;

export const AppliedFiltersNotification = styled.div`
  position: absolute;
  left: 4px;
  top: 10px;

  width: 4px;
  height: 4px;

  border-radius: 50%;

  background-color: ${Colors.purple};
`;

export const StyledFilterLabel = styled.div<{isFiltersDisabled: boolean}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 296px;
  border: 1px solid ${Colors.slate800};
  border-radius: 4px;
  padding: 11px;

  background-color: ${props => (props.isFiltersDisabled ? Colors.slate600 : Colors.slate800)};

  color: ${Colors.slate500};
  cursor: ${props => (props.isFiltersDisabled ? 'default' : 'pointer')};

  &:hover {
    border-color: ${Colors.slate600};
  }
`;
