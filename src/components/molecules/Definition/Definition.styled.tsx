import {CopyOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const DefinitionContainer = styled.div`
  position: relative;
`;

export const StyledCopyOutlined = styled(CopyOutlined)`
  position: absolute;
  top: 0px;
  right: 0px;

  padding: 4px;
  margin: 6px;

  border: 1px solid transparent;
  border-radius: 2px;

  font-size: 16px;

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: ${Colors.indigo400};
  }
`;
