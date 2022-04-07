import {CloseOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledAppliedLabelContainer = styled.div`
  display: flex;
  align-items: center;

  border-radius: 20px;
  padding: 5px 10px;
  min-width: 50px;

  background-color: #ad54f8;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background-color: #562a7c;
  }
`;

export const StyledAppliedLabel = styled.span`
  margin-right: 5px;

  color: ${Colors.whitePure};

  text-align: center;
  font-size: 14px;
`;

export const StyledCloseIcon = styled(CloseOutlined)`
  color: ${Colors.whitePure};
`;
