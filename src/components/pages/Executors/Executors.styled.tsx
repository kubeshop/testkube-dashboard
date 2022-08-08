import {Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const ExecutorsWrapper = styled.div`
  padding: 40px;
`;

export const ExecutorsHeader = styled.div`
  padding-bottom: 30px;
`;

export const ExecutorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;

export const ExecutorsGridItem = styled(Space)`
  padding: 30px;
  border: 1px solid ${Colors.slate700};
  border-radius: 4px;

  transition: all 0.3s;
  cursor: pointer;

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
    span {
      transition: all 0.3s;

      color: ${Colors.purple};
    }
  }
`;
