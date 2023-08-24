import {Space} from 'antd';

import styled from 'styled-components';

import {Colors} from '@styles/Colors';

export const ExecutorsGridItem = styled(Space)`
  justify-content: space-between;

  width: 100%;
  min-height: 240px;
  padding: 30px;
  border: 1px solid ${Colors.slate700};
  border-radius: 4px;

  transition: all 0.3s;
  cursor: pointer;

  &.custom-executor {
    border-color: ${Colors.indigo400};

    span.ant-typography,
    h3 {
      color: ${Colors.indigo400};
    }

    svg {
      fill: ${Colors.indigo400};
      margin-right: 12px;
    }
  }

  .dashboard-title {
    display: flex;
    align-items: center;

    .dashboard-test-runner {
      margin-right: 12px;

      path,
      rect,
      svg {
        fill: ${Colors.slate400};
      }
    }
  }

  &:hover {
    border-color: ${Colors.slate200};

    h3,
    .dashboard-title .dashboard-test-runner svg,
    .dashboard-title .dashboard-test-runner path,
    .dashboard-title .dashboard-test-runner rect,
    &.custom-executor svg,
    span.testkube-text {
      transition: all 0.3s;

      color: ${Colors.slate200};
      fill: ${Colors.slate200};
    }

    svg {
      path,
      rect {
        transition: all 0.3s;

        fill: ${Colors.purple};
      }
    }
  }
`;

export const AddExecutorsModalContainer = styled.div`
  display: flex;
`;

export const CustomExecutorContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  align-items: center;

  padding: 20px;
  border: 1px solid transparent;
  border-radius: 4px;

  background-color: ${Colors.slate800};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border: 1px solid #818cf8;
    background: #0f172a;
  }
`;
