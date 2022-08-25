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
  gap: 40px;
`;

export const ExecutorsGridItem = styled(Space)`
  justify-content: space-between;

  width: 100%;
  min-height: 215px;
  padding: 30px;
  border: 1px solid ${Colors.slate700};
  border-radius: 4px;

  transition: all 0.3s;
  cursor: pointer;

  &.custom-executor {
    svg {
      fill: #64748b;
    }
  }

  .dashboard-title {
    display: flex;
    align-items: center;

    .dashboard-test-runner {
      margin-right: 5px;
    }
  }

  &:hover {
    border-color: ${Colors.purple};

    h3,
    span.testkube-text {
      transition: all 0.3s;

      color: ${Colors.purple};
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
