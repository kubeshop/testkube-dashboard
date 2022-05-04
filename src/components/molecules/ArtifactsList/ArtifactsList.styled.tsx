import {Space} from 'antd';

import {DownloadOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledArtifactsListContainer = styled.ul`
  display: flex;
  flex-direction: column;

  background: #151515;
`;

export const StyledArtifactsListItem = styled.li`
  padding: 7px 15px;
  border: 1px solid #393939;

  color: ${Colors.whitePure};

  cursor: pointer;
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

export const StyledArtifactsFileName = styled.span``;
