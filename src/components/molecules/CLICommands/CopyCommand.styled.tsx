import {CopyOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledCopyCommandContainer = styled.div<{isHovered: boolean}>`
  display: flex;
  justify-content: space-between;

  margin-top: 5px;
  padding: 10px 15px;

  background-color: ${Colors.slate900};
  border-radius: 4px;

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

  font-size: 16px;
`;

export const StyledCopyCommandPre = styled.pre`
  margin-bottom: 0;
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari and Opera */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const StyledCopyCommandCode = styled.code`
  display: flex;
  align-items: center;

  color: ${Colors.greyCode};

  span {
    margin-right: 5px;
    color: ${Colors.slate500};
  }
`;

export const StyledCopyCommandIcon = styled(CopyOutlined)``;
