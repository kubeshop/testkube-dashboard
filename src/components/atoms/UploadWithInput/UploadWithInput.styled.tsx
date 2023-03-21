import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledUploadWithInputContainer = styled.div`
  display: flex;

  width: 100%;

  span {
    .ant-upload {
      button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }

  .ant-input-affix-wrapper.disabled-input {
    height: 40px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    cursor: initial;

    &.has-error {
      border-color: ${Colors.errorRed};
    }

    .ant-input {
      color: ${Colors.grey450};

      cursor: default;
    }

    .ant-input-clear-icon {
      color: ${Colors.grey7};

      visibility: hidden;
    }

    &.not-empty {
      .ant-input-clear-icon {
        display: flex;
        align-items: center;
        justify-content: center;

        color: ${Colors.grey7};

        cursor: pointer;
        visibility: visible;
        transition: 0.3s;

        &:hover {
          color: ${Colors.greyHover};
        }
      }
    }
  }
`;
