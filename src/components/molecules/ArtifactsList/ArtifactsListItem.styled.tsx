import {DownloadOutlined} from '@ant-design/icons';
import {Space} from 'antd';

import styled from 'styled-components';

import {Loader} from '@atoms';

import Colors from '@styles/Colors';

export const ArtifactsListItemContainer = styled.li`
  padding: 10px 15px;

  color: ${Colors.slate300};
  background: ${Colors.slate900};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${Colors.slate700};
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.6;
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

export const StyledLoader = styled(Loader)`
  svg {
    path {
      fill: ${Colors.purple};
    }
  }
`;

export const StyledDownloadIcon = styled(DownloadOutlined)`
  svg {
    path {
      fill: ${Colors.purple};
    }
  }
`;

export const StyledDownloadAllContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
