import {Space} from 'antd';

import styled from 'styled-components';

import {ReactComponent as ExternalLinkIcon} from '@assets/external.svg';

import Colors from '@styles/Colors';

export const StyledExecutionStepsList = styled.ul`
  display: flex;
  flex-direction: column;

  background: #151515;
`;

export const StyledExecutionStepsListItem = styled.li`
  padding: 7px 15px;
  border: 1px solid #393939;

  color: ${Colors.whitePure};

  &.clickable {
    cursor: pointer;
  }
`;

export const StyledSpace = styled(Space)`
  width: 100%;

  .ant-space-item {
    display: flex;
    align-items: center;
  }

  .ant-space-item:last-of-type {
    margin-left: auto;

    svg {
      width: 16px;
    }
  }
`;

export const StyledExternalLinkIcon = styled(ExternalLinkIcon)`
  width: 20px;
  height: 30px;

  cursor: pointer;
`;
