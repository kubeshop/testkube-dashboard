import {Space} from 'antd';

import styled from 'styled-components';

import {ReactComponent as ExternalLinkIcon} from '@assets/external.svg';

import Colors from '@styles/Colors';

export const ExecutionStepsListContainer = styled.ul`
  counter-reset: steps;

  display: flex;
  flex-direction: column;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export const ExecutionStepsListItem = styled.ul`
  position: relative;
  padding: 0 0 0 6px;
  margin: 10px 0 10px 30px;
  border-left: 4px solid ${Colors.slate600};

  &:before {
    counter-increment: steps;
    content: counter(steps);
    position: absolute;
    right: 100%;
    margin-right: 10px;
    margin-top: 4.5px;
    background: ${Colors.slate600};
    color: ${Colors.slate800};
    font-weight: bold;
    width: 1.5em;
    height: 1.5em;
    line-height: 1.5em;
    border-radius: 3px;
    text-align: center;
  }
`;

export const ExecutionStepsListItemExecution = styled.li`
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
