import {Checkbox, Dropdown, Menu} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const StyledFilterMenu = styled(Menu)`
  border: 1px solid ${Colors.greyBorder};

  background-color: ${Colors.grey1000};
`;

export const StyledFilterCheckbox = styled(Checkbox)`
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
    background-color: ${Colors.dashboardTableBackground};
    .ant-checkbox-inner {
      border-color: ${Colors.purple};
    }
  }
`;

export const StyledFilterDropdown = styled(Dropdown)`
  padding: 0 4px;

  ${props => (props.visible ? `background-color: ${Colors.greyHover};` : '')}

  ${props =>
    props.disabled === false
      ? `&:hover {
    background-color: ${Colors.greyHover};
  }`
      : ''}
`;

export const AppliedFiltersNotification = styled.div`
  position: absolute;
  left: -1px;

  width: 4px;
  height: 4px;

  border-radius: 50%;

  background-color: ${Colors.purple};
`;

export const StyledFilterLabel = styled.div<{isFiltersDisabled: boolean}>`
  position: relative;

  cursor: ${props => (props.isFiltersDisabled ? 'default' : 'pointer')};
  color: ${props => (props.isFiltersDisabled ? Colors.greyDisabled : Colors.grey450)};

  font-size: 14px;
  font-weight: 400;
  font-family: ${Fonts.nunito};
`;
