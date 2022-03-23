import {Space} from 'antd';

import styled from 'styled-components';

import {ReactComponent as ExternalLinkIcon} from '@assets/external.svg';

export const StyledTestSuiteExecutionDefinitionsList = styled.ul`
  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 0;

  background: #151515;

  list-style-type: none;
`;

export const StyledTestSuiteExecutionDefinitionListItem = styled.li`
  padding: 7px 15px;
  border: 1px solid #393939;
`;

export const StyledSpace = styled(Space)`
  width: 100%;

  .ant-space-item {
    display: flex;
    align-items: center;
  }

  .ant-space-item:last-of-type {
    margin-left: auto;
  }
`;

export const StyledExternalLinkIcon = styled(ExternalLinkIcon)`
  width: 15px;
  height: auto;

  cursor: pointer;
`;
