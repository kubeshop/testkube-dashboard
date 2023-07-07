import styled from 'styled-components';

import {StyledText} from '@custom-antd/Typography/Text/Text.styled';

import Colors from '@styles/Colors';

export const SummaryGridWrapper = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  margin: 20px 0;

  @media (min-width: 507px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 860px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1112px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const CustomText = styled(StyledText)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({$color}) => $color};
`;

export const SummaryGridItem = styled.div`
  display: inline-flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;
  width: 100%;
  height: 100px;
  padding: 20px;
  border-radius: 4px;

  background: ${Colors.slate800};

  transition: 0.3s;

  &:hover {
    background: ${Colors.slate800halfalpha};
  }
`;
