import {CheckOutlined, CopyOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

const CopyIconBaseStyles = `
  position: absolute;
  top: 0px;
  right: 0px;

  padding: 4px;
  margin: 6px;
  
  font-size: 22px;

  border-radius: 2px;
`;

export const StyledCopyOutlined = styled(CopyOutlined)`
  ${CopyIconBaseStyles}

  border: 1px solid transparent;
  transition: 0.3s;

  &:hover {
    border-color: ${Colors.indigo400};
  }
`;

export const StyledCheckOutlined = styled(CheckOutlined)`
  ${CopyIconBaseStyles}

  color: ${Colors.lime300};
  border: 1px solid ${Colors.indigo400};
`;
