import {Checkbox, CheckboxProps} from 'antd';

import styled from 'styled-components';

import {Colors} from '@styles/Colors';

export interface CustomCheckboxProps extends CheckboxProps {}

export const CustomCheckbox = styled(Checkbox)`
  width: 100%;

  .ant-checkbox-inner {
    width: 24px;
    height: 24px;

    background-color: transparent;
    border-color: ${Colors.slate600};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${Colors.purple};
    border: 0;
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${Colors.purple};
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    left: 7px;
    top: 11px;
  }

  .ant-checkbox + span {
    margin: auto 0;
  }

  color: ${Colors.grey450};
`;
