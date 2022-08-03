import {Space} from 'antd';

import {DownloadOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const ArtifactsListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export const ArtifactsListItem = styled.li`
  padding: 10px 15px;

  color: ${Colors.slate300};
  background: ${Colors.slate900};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${Colors.slate700};
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

export const StyledDownloadIcon = styled(DownloadOutlined)`
  svg {
    path {
      fill: ${Colors.purple};
    }
  }
`;
