import {Space} from 'antd';

import styled from 'styled-components';

import {ReactComponent as ExternalLinkIcon} from '@assets/external.svg';

import Colors from '@styles/Colors';

export const StyledExecutionStepsList = styled.ul`
  display: flex;
  flex-direction: column;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export const StyledExecutionStepsListItem = styled.li`
  display: flex;
  align-items: center;

  height: 30px;

  color: ${Colors.whitePure};

  &:not(:last-child) {
    height: 45px;
    padding-bottom: 16px;
  }

  &.clickable {
    cursor: pointer;

    svg {
      cursor: pointer;
    }
  }
`;

export const StyledSpace = styled(Space)`
  width: 100%;

  .ant-space-item {
    display: flex;
    align-items: center;
  }

  .ant-space-item:nth-child(3) {
    overflow: hidden;
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
`;
