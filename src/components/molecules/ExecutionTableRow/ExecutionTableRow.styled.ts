import {Space} from 'antd';

import {RightOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledExecutionStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledExecutionStartDate = styled.span`
  color: ${Colors.whitePure};
`;

export const StyledExecutionStartEndDate = styled.span`
  color: ${Colors.whitePure};
`;

export const StyledExecutionName = styled.span`
  color: ${Colors.whitePure};
`;

export const StyledChevronRightIcon = styled(RightOutlined)`
  color: ${Colors.purple};
`;

export const StyledSpace = styled(Space)`
  width: 100%;

  .ant-space-item:last-of-type {
    margin-left: auto;
  }
`;

export const StyledExecutionSequenceNumber = styled.span`
  color: ${Colors.whitePure};

  font-size: 14px;
`;
