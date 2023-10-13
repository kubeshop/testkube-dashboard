import styled from 'styled-components';

import Colors from '@styles/Colors';
import {maxDevice} from '@styles/MediaQueries';

export const StyledWizardHintContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 400px;
  padding: 0 60px;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  text-align: center;

  @media ${maxDevice.tablet} {
    display: none;
  }
`;

export const StyledImageContainer = styled.div`
  position: relative;

  height: 154px;
`;

export const AbsoluteExecutorIconContainer = styled.div`
  position: absolute;
  left: 95px;
  top: 40px;

  svg {
    path {
      fill: ${Colors.whitePure};
    }
    width: 44px;
    height: 44px;
  }
`;
