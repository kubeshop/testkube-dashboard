import {Input} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const StyledSearchInput = styled(Input.Search)`
  .ant-input {
    border-color: ${Colors.grey3};

    color: #aaa;
    background: ${Colors.grey1000};

    font-size: 14px;
    font-weight: 400;
    font-style: italic;
    font-family: ${Fonts.nunito};

    &:focus,
    &:hover,
    &:active {
      border-color: ${props => (props.disabled ? 'transparent' : Colors.purple)};
      box-shadow: none;

      &-group-addon {
        .ant-btn {
          border-left-color: ${Colors.purple};
        }
      }
    }

    &-group-addon {
      background: ${Colors.grey1000};
      .anticon {
        color: ${Colors.whitePure};
      }
      .ant-btn {
        background: ${Colors.grey1000};
        border-color: ${Colors.grey3};
        border-left: unset !important;
      }
    }
  }
`;

export const StyledSearchInputContainer = styled.div`
  margin-right: auto;
`;
