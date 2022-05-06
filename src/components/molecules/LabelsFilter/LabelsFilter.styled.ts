import {CloseOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const StyledAppliedLabelContainer = styled.div`
  display: flex;
  align-items: center;

  border-radius: 20px;
  padding: 5px 10px;
  min-width: 50px;

  background-color: #ad54f8;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background-color: #562a7c;
  }
`;

export const StyledAppliedLabel = styled.span`
  margin-right: 5px;

  color: ${Colors.whitePure};

  text-align: center;
  font-size: 14px;
`;

export const StyledCloseIcon = styled(CloseOutlined)`
  color: ${Colors.whitePure};
`;

export const StyledLabelsMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px;
`;

export const StyledLabelFilterText = styled.span`
  color: ${Colors.grey450};

  font-family: ${Fonts.nunito};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export const StyledTitle = styled(StyledLabelFilterText)`
  text-align: left;
`;

export const StyledAddRowButton = styled(StyledLabelFilterText)`
  &:hover {
    background-color: ${Colors.dashboardTableBackground};
  }

  width: fit-content;

  border-radius: 2px;

  padding: 1px 8px;

  cursor: pointer;
  transition: 0.3s all;
`;

export const StyledKeyValueRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const StyledKeyValueLabel = styled(StyledLabelFilterText)`
  width: 220px;

  text-align: left;
`;

export const StyledDeleteRowButton = styled(StyledLabelFilterText)`
  position: relative;
  width: 21px;
  height: 21px;

  border: 2px solid ${Colors.greyBorder};
  border-radius: 50%;

  cursor: pointer;

  &:after {
    position: absolute;
    bottom: -2px;
    right: 3px;

    content: '+';

    color: ${Colors.grey450};

    font-size: 22px;
    text-align: center;

    transform: rotate(-45deg);
  }
`;

export const EmptyButton = styled.div`
  width: 21px;
`;
