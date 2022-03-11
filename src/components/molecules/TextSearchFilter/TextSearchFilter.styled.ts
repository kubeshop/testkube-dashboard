import {Input} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const StyledSearchInput = styled(Input.Search)`
  .ant-input {
    border-color: #262626;

    color: #aaa;
    background: #141414;

    font-size: 14px;
    font-weight: 400;
    font-style: italic;
    font-family: ${Fonts.nunito};

    // &:focus,
    // &:hover,
    // &:active {
    //   border-color: ${Colors.purple};
    //   box-shadow: none;

    //   &-group-addon {
    //     .ant-btn {
    //       border-left-color: ${Colors.purple};
    //     }
    //   }
    // }

    &-group-addon {
      background: #141414;

      .ant-btn {
        background: #141414;
        border-color: #262626;
        border-left: unset !important;
      }
    }
  }
`;

export const StyledSearchInputContainer = styled.div``;
