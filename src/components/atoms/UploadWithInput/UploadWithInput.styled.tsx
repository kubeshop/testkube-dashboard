import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledUploadWithInputContainer = styled.div`
  display: flex;

  span {
    .ant-upload {
      button {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
    }
  }

  .ant-input-affix-wrapper.disabled-input {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    cursor: initial;

    &.has-error {
      border-color: ${Colors.errorRed};
    }

    .ant-input {
      color: ${Colors.grey450};
      background-color: ${Colors.grey1000};

      cursor: default;
    }

    &.not-empty {
      .ant-input-clear-icon {
        color: ${Colors.grey7};

        visibility: visible;

        &:hover {
          color: ${Colors.greyHover};
        }
      }
    }
  }
`;
