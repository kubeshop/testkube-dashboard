import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledTestRunnerContainer = styled.div`
  display: flex;
  align-items: center;

  padding-top: 12px;

  .test-runner-name {
    margin-left: 10px;
    margin-bottom: 0;

    color: ${Colors.greySecondary};

    font-size: 14px;
    font-weight: 300;
  }
`;
