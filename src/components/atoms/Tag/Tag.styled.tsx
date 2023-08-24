import styled from 'styled-components';

import Colors from '@styles/Colors';

export const TagContainer = styled.div`
  display: inline-flex;
  padding: 4px;
  align-items: center;
  gap: 8px;
  height: 24px;
  cursor: default;
  color: ${Colors.slate400};

  border-radius: 4px;
  background: ${Colors.slate800};
  border: 1px solid transparent;

  svg {
    height: 12px;
    width: 12px;
    fill: currentcolor;
  }

  .ant-typography {
    color: currentcolor;
  }

  &.success {
    background: ${Colors.lime900};
    border: 1px solid ${Colors.lime600};
    color: ${Colors.lime300};
  }

  &.warning {
    background: ${Colors.yellow900};
    border: 1px solid ${Colors.yellow600};
    color: ${Colors.yellow300};
  }

  &.error {
    background: ${Colors.pink900};
    border: 1px solid ${Colors.pink600};
    color: ${Colors.pink300};
  }

  &.info {
    background: ${Colors.sky900};
    border: 1px solid ${Colors.sky600};
    color: ${Colors.sky300};
  }
`;
