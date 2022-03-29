import {CopyOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledCopyCommandContainer = styled.div<{isHovered: boolean}>`
  display: flex;
  justify-content: space-between;

  padding: 10px 15px;

  background-color: ${Colors.grey1000};

  cursor: pointer;

  span {
    svg {
      color: ${Colors.whitePure};

      font-size: 22px;

      transition: 0.15s ease;
      opacity: 0;
    }
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  &:hover {
    span {
      svg {
        transition: 0.15s ease;
        opacity: 1;
      }
    }
  }
`;

export const StyledCopyCommandLabel = styled.span`
  margin-bottom: 5px;
  color: ${Colors.grey450};
  font-size: 18px;
`;

export const StyledCopyCommandPre = styled.pre`
  margin-bottom: 0;
`;

export const StyledCopyCommandCode = styled.code`
  color: ${Colors.purple};
`;

export const StyledCopyCommandIcon = styled(CopyOutlined)``;
