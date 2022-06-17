import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const VariablesListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReadOnlyVariableRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;

  margin-bottom: 13px;
`;

export const StyledReadOnlyLabel = styled.div<{width?: string}>`
  flex: 1;

  color: ${Colors.grey450};
  font-family: ${Fonts.nunito};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

export const StyledReadOnlyVariableLabel = styled(StyledReadOnlyLabel)`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid ${Colors.greyHover};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
