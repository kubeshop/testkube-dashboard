import styled from 'styled-components';

import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';

export const ArgumentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  .args-textarea {
    color: ${Colors.slate50};

    font-family: ${Fonts.mono};

    resize: none;
  }
`;
