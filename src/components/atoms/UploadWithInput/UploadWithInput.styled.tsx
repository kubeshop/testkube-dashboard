import styled from 'styled-components';

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
      border-color: #db539c;
    }

    .ant-input {
      color: #dbdbdb;
      background-color: #141414;

      cursor: default;
    }

    &.not-empty {
      .ant-input-clear-icon {
        color: #7d7d7d;

        visibility: visible;

        &:hover {
          color: #303030;
        }
      }
    }
  }
`;
