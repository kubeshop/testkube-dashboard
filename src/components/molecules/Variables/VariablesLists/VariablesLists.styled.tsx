import {Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const VariablesListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.div<{width: string}>`
  width: ${props => props.width};

  color: ${Colors.grey450};
  font-family: ${Fonts.nunito};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export const Asterisk = styled.span`
  &:after {
    content: '*';
    margin: 0 4px;
  }

  color: ${Colors.errorRed};
`;

export const StyledSpace = styled(Space)<{showClearIcon?: boolean}>`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px !important;

  margin-bottom: 8px;

  &:first-child {
    margin-top: 24px;
  }

  & > div:last-child {
    margin-top: 4px;
  }

  .ant-input-suffix {
    ${props =>
      props.showClearIcon
        ? `svg {
      fill: ${Colors.errorRed};
    }`
        : `display: none;`}
  }
`;

export const StyledPopoverContent = styled.div`
  width: 180px;

  color: ${Colors.grey450};
  font-family: ${Fonts.nunito};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;
