import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledTestRunnerContainer = styled.div`
  display: flex;
  align-items: center;

  padding-top: 12px;

  h5 {
    margin-left: 10px;
    margin-bottom: 0;

    color: ${Colors.greySecondary} !important;

    font-size: 14px;
  }
`;
