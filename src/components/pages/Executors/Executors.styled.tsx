import {Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const ExecutorsWrapper = styled.div`
  overflow: auto;

  padding: 40px 40px 40px 1vw;
`;

export const ExecutorsHeader = styled.div`
  padding-bottom: 30px;
`;

export const ExecutorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 32px;
`;

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
